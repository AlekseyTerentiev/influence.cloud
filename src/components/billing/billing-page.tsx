import React, { FC, useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { CREATE_TASK_ROUTE } from 'routes';
import { navigate } from '@reach/router';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Tabs,
  Tab,
  Hidden,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useMe } from 'gql/user';
import {
  useCreateRefillTransaction,
  useCreateWithdrawalTransaction,
  useCheckBalanceTransaction,
} from 'gql/billing';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { Currency } from './currency';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Modal } from 'components/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from 'gql/types/globalTypes';

export interface BillingPageProps extends RouteComponentProps {}

export const stripeCurrencies: { name: string; sign: string }[] = [
  { name: 'usd', sign: '$' },
  { name: 'rub', sign: '₽' },
];

export const BillingPage: FC<BillingPageProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading: loadingMe } = useMe();
  const [createRefillTransaction] = useCreateRefillTransaction();
  const [createWithdrawalTransaction] = useCreateWithdrawalTransaction();
  const [checkBalanceTransaction] = useCheckBalanceTransaction();

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.refill,
  );
  const handleTransactionTypeChange = (
    e: ChangeEvent<{}>,
    type: TransactionType,
  ) => {
    setTransactionType(type);
  };

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const [amount, setAmount] = useState(0); // In dollars
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setAmount(Number(e.target.value));
  };

  const stripe = useStripe();
  const elements = useElements();
  const handleCardChange = ({ error }: any) => {
    setError(error);
  };

  const [cardCurrency, setCardCurrency] = useState(stripeCurrencies[0].name);
  const handleCardCurrencyChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    setCardCurrency(String(event.target.value));
  };

  const notEnoughtMoneyToWithdrawal =
    transactionType === 'withdrawal' && amount * 100 > (me?.balance?.balance || 0);

  const makeTransaction = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card: any = elements.getElement(CardElement);

    if (!amount) {
      throw t('Enter the required amount');
    } else if (card._empty) {
      throw t('Fill in card details');
    } else if (card._invalid) {
      return;
    }

    if (transactionType === 'refill') {
      const createTransactionRes = await createRefillTransaction({
        variables: { amount: amount * 100 },
      });
      const transactionClientSecret =
        createTransactionRes.data?.createRefillTransaction.clientSecret;
      if (!transactionClientSecret) {
        throw new window.Error('RefillTransactionClientSecret key was not received');
      }
      const {
        paymentIntent,
        error: confirmCardPaymentError,
      } = await stripe.confirmCardPayment(transactionClientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: `${me?.familyName} ${me?.givenName}`,
          },
        },
      });
      if (confirmCardPaymentError?.message) {
        throw confirmCardPaymentError.message;
      } else if (paymentIntent?.status !== 'succeeded') {
        throw new window.Error(`PaymentIntent status: ${paymentIntent?.status}`);
      }
      await checkBalanceTransaction({
        variables: {
          type: transactionType,
          paymentId: paymentIntent.id,
        },
      });
    }

    if (transactionType === 'withdrawal') {
      const {
        paymentMethod,
        error: createPaymentMethodError,
      } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
          name: `${me?.familyName} ${me?.givenName}`,
        },
      });
      if (createPaymentMethodError?.message) {
        throw createPaymentMethodError.message;
      } else if (!paymentMethod) {
        throw new window.Error('PaymentMethod was not created');
      }
      const { token, error: createTokenError } = await stripe.createToken(card, {
        name: `${me?.familyName} ${me?.givenName}`,
        currency: cardCurrency,
      });
      if (createTokenError?.message) {
        throw createTokenError.message;
      } else if (!token?.id) {
        throw new window.Error('Card token was not received');
      }
      const createWithdrawalTransactionRes = await createWithdrawalTransaction({
        variables: { amount: amount * 100, token: token.id },
      });
      const withdrawalTransaction =
        createWithdrawalTransactionRes.data?.createWithdrawalTransaction;
      if (!withdrawalTransaction?.id) {
        throw new window.Error('WithdrawalTransaction id was not received');
      }
      await checkBalanceTransaction({
        variables: {
          type: transactionType,
          paymentId: withdrawalTransaction.id,
        },
      });
    }

    setSuccessAlertOpen(true);
    setAmount(0);
  };

  const handleTransactionSubmit = (e: FormEvent) => {
    e.preventDefault();

    setError('');

    setTimeout(async () => {
      // This timeout allows the card to be validated,
      // when user click submit while card input is focused and chaged
      setProcessing(true);
      try {
        await makeTransaction();
      } catch (e) {
        setError(e);
      } finally {
        setProcessing(false);
      }
    }, 0);
  };

  const handleSuccessAlertClose = () => setSuccessAlertOpen(false);

  const handleCreateTaskClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(CREATE_TASK_ROUTE);
  };

  if (loadingMe) {
    return <Loading />;
  }

  return (
    <Box className={c.root}>
      <Typography className={c.balance}>
        <Currency value={me?.balance.balance} />
      </Typography>
      <Typography className={c.balanceLabel}>{t('On Balance')}</Typography>

      <Tabs
        value={transactionType}
        onChange={handleTransactionTypeChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        className={c.tabs}
        disabled={processing}
      >
        <Tab
          disabled={processing}
          label={t('Refill')}
          value={TransactionType.refill}
        />
        <Tab
          disabled={processing}
          label={t('Withdrawal')}
          value={TransactionType.withdrawal}
        />
      </Tabs>

      <form id={transactionType} onSubmit={handleTransactionSubmit}>
        <TextField
          type='number'
          label={
            notEnoughtMoneyToWithdrawal
              ? t('Insufficient funds for withdrawal')
              : transactionType === 'refill'
              ? t('Refill amount')
              : t('Withdrawal amount')
          }
          name={transactionType + '-amount'}
          placeholder='0'
          error={notEnoughtMoneyToWithdrawal}
          value={amount || ''}
          onChange={handleAmountChange}
          variant='outlined'
          margin='normal'
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          inputProps={{
            min: 0,
          }}
        />

        <Box className={c.cardField}>
          <CardElement
            onChange={handleCardChange}
            className={c.cardFieldStripeElement}
          />
          {transactionType === 'withdrawal' && (
            <Select
              className={c.cardFieldCurrencySelect}
              value={cardCurrency}
              onChange={handleCardCurrencyChange}
              disableUnderline
            >
              {stripeCurrencies.map((currency) => (
                <MenuItem key={currency.name} value={currency.name}>
                  {currency.sign}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>

        {error && <Error error={error} />}

        <Button
          variant='contained'
          color='primary'
          type='submit'
          size='large'
          fullWidth
          disabled={
            processing || !stripe || !elements || notEnoughtMoneyToWithdrawal
          }
          style={{ marginTop: 14 }}
        >
          {processing ? (
            <CircularProgress style={{ width: 24, height: 24 }} />
          ) : transactionType === 'refill' ? (
            t('Top up balance')
          ) : (
            transactionType === 'withdrawal' && t('Withdraw funds')
          )}
        </Button>
      </form>

      <Modal
        open={successAlertOpen}
        onClose={handleSuccessAlertClose}
        fullWidthOnMobile={false}
      >
        <Box className={c.successAlert}>
          <Box className={c.successAlertIconContainer}>
            <FontAwesomeIcon icon={faCheck} className={c.successAlertIcon} />
          </Box>

          <Typography variant='h5' gutterBottom>
            {transactionType === 'refill' &&
              t('The balance has been successfully refilled!')}
            {transactionType === 'withdrawal' &&
              t('Withdrawal request successfully completed')}
          </Typography>

          {transactionType === 'refill' && (
            <>
              <Typography gutterBottom>
                {t('On your balance:')}{' '}
                <Currency
                  className={c.successAlertBalance}
                  value={me?.balance.balance}
                />
              </Typography>
              <Typography className={c.successAlertText}>
                {t(
                  'With these funds, you can create new tasks and pay tips for their successful completion',
                )}{' '}
              </Typography>
            </>
          )}
          {transactionType === 'withdrawal' && (
            <Typography className={c.successAlertText}>
              {t('Funds will be credited to the card you specified')}{' '}
              <Hidden xsDown>
                <br />
              </Hidden>
              {t('within 2-7 business days')}
            </Typography>
          )}

          <Box m='auto' mt={2}>
            {transactionType === 'refill' && (
              <Button
                href={CREATE_TASK_ROUTE}
                variant='outlined'
                color='primary'
                onClick={handleCreateTaskClick}
              >
                {t('Publish task')}
              </Button>
            )}
            {transactionType === 'withdrawal' && (
              <Button
                variant='outlined'
                color='primary'
                onClick={handleSuccessAlertClose}
              >
                {t('Close')}
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      maxWidth: 400,
      textAlign: 'center',
      margin: 'auto',
      padding: theme.spacing(4, 0),
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 0),
      },
    },
    balance: {
      fontSize: '3.6rem',
      lineHeight: '1.3',
      fontWeight: theme.typography.fontWeightLight,
    },
    balanceLabel: {
      textTransform: 'uppercase',
      fontSize: '1.05rem',
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.hint,
    },
    tabs: {
      marginTop: theme.spacing(1.25),
      marginBottom: theme.spacing(1),
      borderBottom: '1px solid' + theme.palette.divider,
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
        borderWidth: 2,
      },
    },
    cardField: {
      padding: theme.spacing(2.8, 1.75, 2.2),
      borderRadius: theme.shape.borderRadius,
      border: '1px solid' + theme.palette.divider,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3.2, 1.75, 2.4),
        borderRadius: theme.shape.borderRadius * 1.5,
      },
      display: 'flex',
      alignItems: 'center',
      height: 60,
    },
    cardFieldStripeElement: {
      flex: 1,
    },
    cardFieldCurrencySelect: {
      marginLeft: theme.spacing(1),
      marginBottom: 3,
    },
    successAlert: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(2.5),
    },
    successAlertIconContainer: {
      marginBottom: theme.spacing(1.5),
      backgroundColor: theme.palette.grey[200],
      borderRadius: '50%',
      margin: 'auto',
      padding: theme.spacing(2.5),
    },
    successAlertIcon: {
      display: 'block',
      color: theme.palette.success.main,
      fontSize: '1.5rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.75rem',
      },
    },
    successAlertBalance: {
      color: theme.palette.success.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    successAlertText: {
      fontWeight: theme.typography.body2.fontWeight,
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.secondary,
    },
  }),
);

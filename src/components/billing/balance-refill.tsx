import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
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
} from '@material-ui/core';
import { useMe } from 'gql/user';
import { useCreateRefillTransaction, useCheckBalanceTransaction } from 'gql/billing';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Currency } from './currency';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Modal } from 'components/common/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from 'gql/types/globalTypes';

interface BalanceRefillProps {}

const TRANSACTION_TYPE = TransactionType.refill;

export const BalanceRefill: FC<BalanceRefillProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading: loadingMe } = useMe();
  const [createRefillTransaction] = useCreateRefillTransaction();
  const [checkBalanceTransaction] = useCheckBalanceTransaction();

  const [error, setError] = useState('');
  const [refilling, setRefilling] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const [amount, setAmount] = useState(50); // In dollars
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setAmount(Number(e.target.value));
  };

  const stripe = useStripe();
  const elements = useElements();
  const handleCardChange = ({ error }: any) => {
    setError(error);
  };

  const makeTransaction = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card: any = elements.getElement(CardElement);

    if (!amount) {
      return setError(t('Enter the required amount'));
    } else if (card._empty) {
      return setError(t('Fill in card details'));
    } else if (card._invalid) {
      return;
    }

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
      payment_method: { card: card },
    });
    if (confirmCardPaymentError?.message) {
      throw confirmCardPaymentError.message;
    } else if (paymentIntent?.status !== 'succeeded') {
      throw new window.Error(`PaymentIntent status: ${paymentIntent?.status}`);
    }

    await checkBalanceTransaction({
      variables: {
        type: TRANSACTION_TYPE,
        paymentId: paymentIntent.id,
      },
    });
    (window as any).gtag('event', `balance_${TRANSACTION_TYPE}`, { amount });
    (window as any).fbq('trackCustom', `balance_${TRANSACTION_TYPE}`, { amount });

    setSuccessAlertOpen(true);
    setAmount(0);
  };

  const handleTransactionSubmit = (e: FormEvent) => {
    e.preventDefault();

    setError('');

    setTimeout(async () => {
      // This timeout allows the card to be validated,
      // when user click submit while card input is focused and chaged
      setRefilling(true);
      try {
        await makeTransaction();
      } catch (e) {
        setError(e);
        (window as any).gtag('event', `balance_${TRANSACTION_TYPE}_fail`);
        (window as any).fbq('trackCustom', `balance_${TRANSACTION_TYPE}_fail`, {
          error: e.message || e,
        });
      } finally {
        setRefilling(false);
      }
    }, 0);
  };

  const handleSuccessAlertClose = () => setSuccessAlertOpen(false);

  if (loadingMe) {
    return <Loading />;
  }

  return (
    <>
      <form id={TRANSACTION_TYPE} onSubmit={handleTransactionSubmit}>
        {/* <TextField
          type='number'
          label={t('Refill amount') + '*'}
          name={TRANSACTION_TYPE + '-amount'}
          placeholder='0'
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
        /> */}

        <Box mb={1.5} textAlign='left'>
          <Typography display='inline'>{t('Refill amount')}:</Typography>{' '}
          <Typography display='inline' variant='h6' color='primary'>
            <Currency value={amount * 100} />*
          </Typography>
        </Box>

        <Box className={c.cardField}>
          <CardElement
            options={{ hidePostalCode: true }}
            onChange={handleCardChange}
            className={c.cardFieldStripeElement}
          />
        </Box>

        {error && <Error error={error} />}

        <Button
          variant='contained'
          color='primary'
          type='submit'
          size='large'
          fullWidth
          disabled={refilling}
          style={{ marginTop: 8 }}
        >
          {refilling ? (
            <CircularProgress style={{ width: 28, height: 28 }} />
          ) : (
            t('Top up balance')
          )}
        </Button>

        <Typography className={c.additionalText}>
          {t('*additional commission of 30 cents will be charged')}
        </Typography>
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
            {t('The balance has been successfully refilled!')}
          </Typography>

          <Typography gutterBottom>
            {t('On your balance:')}{' '}
            <Currency
              className={c.successAlertBalance}
              value={me?.balance.balance}
            />
          </Typography>

          {/* <Typography className={c.successAlertText}>
            {t(
              'With these funds, you can create new tasks and pay tips for their successful completion',
            )}{' '}
          </Typography> */}

          <Box m='auto' mt={2}>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleSuccessAlertClose}
            >
              {t('Close')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    cardField: {
      padding: t.spacing(2.6, 1.5, 2),
      borderRadius: t.shape.borderRadius * 3,
      border: `1px solid ${t.palette.divider}`,
      marginTop: t.spacing(0.5),
      marginBottom: t.spacing(0.8),
      display: 'flex',
      alignItems: 'center',
    },
    cardFieldStripeElement: {
      flex: 1,
    },
    cardFieldCurrencySelect: {
      marginLeft: t.spacing(1),
      marginBottom: 3,
    },
    additionalText: {
      color: 'rgba(154, 155, 180, 1)',
      fontSize: '0.75rem',
      marginTop: t.spacing(1),
      marginLeft: t.spacing(1),
    },
    successAlert: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: t.spacing(2.5),
    },
    successAlertIconContainer: {
      marginBottom: t.spacing(1.5),
      backgroundColor: t.palette.grey[200],
      borderRadius: '50%',
      margin: 'auto',
      padding: t.spacing(2.5),
    },
    successAlertIcon: {
      display: 'block',
      color: t.palette.success.main,
      fontSize: '1.5rem',
      [t.breakpoints.up('md')]: {
        fontSize: '1.75rem',
      },
    },
    successAlertBalance: {
      color: t.palette.success.main,
      fontWeight: t.typography.fontWeightMedium,
    },
    successAlertText: {
      fontWeight: t.typography.body2.fontWeight,
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
    },
  }),
);

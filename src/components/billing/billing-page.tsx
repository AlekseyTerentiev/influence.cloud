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
  // Select,
  // MenuItem,
  FormControl,
  InputLabel,
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
import { PhoneInput } from 'components/account/phone-input';
import { DatePicker } from '@material-ui/pickers';
import { AccountAddressParam } from '@stripe/stripe-js';
import Countries from 'country-list';

// const countries = Countries.getNames();
const countries = Countries.getNames();

export interface BillingPageProps extends RouteComponentProps {}

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

  const [withdrawalInfo, setWithdrawalInfo] = useState<{
    SSN: string;
    name: string;
    birthDate: Date | null;
    phone: string;
    email: string;
    website: string;
    address: AccountAddressParam;
  }>({
    SSN: '',
    name: '',
    birthDate: null,
    phone: '',
    email: me?.email || '',
    website: '',
    address: {
      country: 'US',
      city: '',
      line1: '',
      line2: '',
      postal_code: '',
      state: '',
    },
  });

  function handleWithdrawalInfoChange(e: ChangeEvent<any>) {
    if (e.target.name === 'SSN' && e.target.value.length > 4) {
      return;
    }
    setWithdrawalInfo({
      ...withdrawalInfo,
      [e.target.name]: e.target.value,
    });
  }

  const handleWithdrawalInfoAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWithdrawalInfo({
      ...withdrawalInfo,
      address: {
        ...withdrawalInfo.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleCountryChange = (e: ChangeEvent<{ value: unknown }>) => {
    setWithdrawalInfo({
      ...withdrawalInfo,
      address: {
        ...withdrawalInfo.address,
        country: e.target.value as string,
      },
    });
  };

  // const [cardCurrency, setCardCurrency] = useState(stripeCurrencies[0].name);
  // const handleCardCurrencyChange = (
  //   event: React.ChangeEvent<{ name?: string; value: unknown }>,
  // ) => {
  //   setCardCurrency(String(event.target.value));
  // };

  const notEnoughtMoneyToWithdrawal =
    transactionType === 'withdrawal' && amount * 100 > (me?.balance?.balance || 0);

  const submitDisabled =
    processing ||
    !stripe ||
    !elements ||
    (transactionType === 'withdrawal' &&
      (notEnoughtMoneyToWithdrawal ||
        withdrawalInfo.SSN.length < 4 ||
        !withdrawalInfo.name ||
        !withdrawalInfo.birthDate ||
        !withdrawalInfo.address.country ||
        !withdrawalInfo.address.state ||
        !withdrawalInfo.address.city ||
        !withdrawalInfo.address.line1 ||
        !withdrawalInfo.address.line2 ||
        !withdrawalInfo.address.postal_code ||
        !withdrawalInfo.phone ||
        !withdrawalInfo.email ||
        !withdrawalInfo.website));

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
          // billing_details: {
          //   name: `${me?.familyName} ${me?.givenName}`,
          // },
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
      if (!withdrawalInfo?.birthDate) {
        return;
      }
      const {
        paymentMethod,
        error: createPaymentMethodError,
      } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
          name: withdrawalInfo.name,
          phone: withdrawalInfo.phone,
          email: withdrawalInfo.email,
          address: withdrawalInfo.address,
        },
        metadata: {
          industry: 'marketing',
          website: withdrawalInfo.website,
          birthDate: withdrawalInfo.birthDate.getTime() / 1000,
          SSN: withdrawalInfo.SSN,
        },
      });
      if (createPaymentMethodError?.message) {
        throw createPaymentMethodError.message;
      } else if (!paymentMethod) {
        throw new window.Error('PaymentMethod was not created');
      }
      const { token, error: createTokenError } = await stripe.createToken(card, {
        name: `${me?.familyName} ${me?.givenName}`,
        // currency: cardCurrency,
        currency: 'USD',
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
          {/* {transactionType === 'withdrawal' && (
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
          )} */}
        </Box>

        {transactionType === 'withdrawal' && (
          <>
            <TextField
              label='Full Name'
              name='givenName'
              value={withdrawalInfo.name}
              onChange={handleWithdrawalInfoChange}
              variant='outlined'
              margin='normal'
              fullWidth
            />

            <FormControl fullWidth margin='normal' variant='outlined'>
              <InputLabel shrink={!!withdrawalInfo.birthDate}>
                {t('Birthday')}
              </InputLabel>
              <DatePicker
                name='birthDate'
                inputVariant='outlined'
                value={withdrawalInfo.birthDate}
                initialFocusedDate={new Date('1999-01-01')}
                format='MM.DD.YYYY'
                onChange={(birthDate: any) =>
                  setWithdrawalInfo({
                    ...withdrawalInfo,
                    birthDate,
                  })
                }
                variant='inline'
                autoOk={true}
              />
            </FormControl>

            {/* <TextField
              label='Country'
              // disabled={true}
              name='country'
              value={withdrawalInfo.address.country}
              onChange={handleWithdrawalInfoAddressChange}
              variant='outlined'
              margin='normal'
              fullWidth
              helperText='(2-letter country code)'
            /> */}

            <FormControl
              margin='normal'
              fullWidth
              variant='outlined'
              style={{ textAlign: 'start' }}
            >
              <InputLabel id='country'>Country</InputLabel>
              <Select
                labelId='country'
                name='country'
                value={withdrawalInfo.address.country}
                onChange={handleCountryChange}
              >
                {countries.map((countryName) => (
                  <MenuItem
                    key={countryName}
                    value={Countries.getCode(countryName)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {countryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label='State'
              name='state'
              value={withdrawalInfo.address.state}
              onChange={handleWithdrawalInfoAddressChange}
              variant='outlined'
              margin='normal'
              fullWidth
              helperText='(state, county, province, or region)'
            />
            <TextField
              label='City'
              name='city'
              value={withdrawalInfo.address.city}
              onChange={handleWithdrawalInfoAddressChange}
              variant='outlined'
              margin='normal'
              fullWidth
              helperText='(city, district, suburb, town, or village)'
            />
            <TextField
              label='Adress Line 1'
              name='line1'
              value={withdrawalInfo.address.line1}
              onChange={handleWithdrawalInfoAddressChange}
              variant='outlined'
              margin='normal'
              fullWidth
              helperText='(e.g., street, PO Box, or company name)'
            />
            <TextField
              label='Adress Line 2'
              name='line2'
              value={withdrawalInfo.address.line2}
              onChange={handleWithdrawalInfoAddressChange}
              variant='outlined'
              margin='normal'
              fullWidth
              helperText='(e.g., apartment, suite, unit, or building)'
            />

            <TextField
              label='ZIP or Postal Code'
              name='postal_code'
              value={withdrawalInfo.address.postal_code}
              onChange={handleWithdrawalInfoAddressChange}
              variant='outlined'
              margin='normal'
              fullWidth
            />

            {withdrawalInfo.address.country === 'US' && (
              <TextField
                label={'SSN (last 4 digits)'}
                name='SSN'
                type='number'
                InputProps={{ inputProps: { min: 0, max: 9999 } }}
                value={withdrawalInfo.SSN}
                onChange={handleWithdrawalInfoChange}
                variant='outlined'
                margin='normal'
                fullWidth
              />
            )}

            <PhoneInput
              value={withdrawalInfo.phone}
              onChange={(phone) => {
                setWithdrawalInfo({
                  ...withdrawalInfo,
                  phone,
                });
              }}
            />

            <TextField
              type='email'
              label='Email'
              name='email'
              value={withdrawalInfo.email}
              onChange={handleWithdrawalInfoChange}
              variant='outlined'
              margin='normal'
              fullWidth
            />

            <TextField
              type='url'
              label='Your website or instagram URL'
              name='website'
              value={withdrawalInfo.website}
              onChange={handleWithdrawalInfoChange}
              variant='outlined'
              margin='normal'
              fullWidth
            />
          </>
        )}

        {error && <Error error={error} />}

        <Button
          variant='contained'
          color='primary'
          type='submit'
          size='large'
          fullWidth
          disabled={submitDisabled}
          style={{ marginTop: 8 }}
        >
          {processing ? (
            <CircularProgress style={{ width: 28, height: 28 }} />
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
      padding: theme.spacing(6, 0, 2.5),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 0, 5),
        maxWidth: 460,
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
      marginTop: theme.spacing(1.75),
      marginBottom: theme.spacing(1.5),
      borderBottom: '1px solid' + theme.palette.divider,
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        borderWidth: 2,
      },
    },
    cardField: {
      padding: theme.spacing(2.9, 1.75, 2.15),
      borderRadius: theme.shape.borderRadius,
      border: '1px solid' + theme.palette.divider,
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.8),
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

export const stripeCurrencies: { name: string; sign: string }[] = [
  { name: 'usd', sign: '$' },
  { name: 'rub', sign: '₽' },
];

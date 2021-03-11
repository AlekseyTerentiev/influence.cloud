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
  Hidden,
  // Select,
  // MenuItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from '@material-ui/core';
import { useMe } from 'gql/user';
import {
  useCreateWithdrawalTransaction,
  useCreateManualTransaction,
  useCheckBalanceTransaction,
} from 'gql/billing';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Modal } from 'components/common/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from 'gql/types/globalTypes';
import { PhoneInput } from 'components/account/phone-input';
import { DatePicker } from '@material-ui/pickers';
import { AccountAddressParam } from '@stripe/stripe-js';
import Countries from 'country-list';

const TRANSACTION_TYPE = TransactionType.withdrawal;

interface BalanceWithdrawalProps {}

export const BalanceWithdrawal: FC<BalanceWithdrawalProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading: loadingMe } = useMe();
  const [createWithdrawalTransaction] = useCreateWithdrawalTransaction();
  const [createManualTransaction] = useCreateManualTransaction();
  const [checkBalanceTransaction] = useCheckBalanceTransaction();

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
    cardNumber: string;
    SSN: string;
    name: string;
    birthDate: any;
    phone: string;
    email: string;
    website: string;
    address: AccountAddressParam;
  }>({
    cardNumber: '',
    SSN: '',
    name: '',
    birthDate: null,
    phone: me?.phone || '',
    email: me?.email || '',
    website: '',
    address: {
      country: me?.country || 'US',
      city: '',
      line1: '',
      line2: '',
      postal_code: '',
      state: '',
    },
  });

  const handleWithdrawalInfoChange = (e: ChangeEvent<any>) => {
    if (e.target.name === 'SSN' && e.target.value.length > 4) {
      return;
    }
    setWithdrawalInfo({
      ...withdrawalInfo,
      [e.target.name]: e.target.value,
    });
  };

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
  //   e: ChangeEvent<{ name?: string; value: unknown }>,
  // ) => {
  //   setCardCurrency(String(e.target.value));
  // };

  const stripeWithdrawal =
    supportedWithdrawalCountries[withdrawalInfo.address.country || ''];
  const notEnoughtMoneyForWithdrawal = amount * 100 > (me?.balance?.balance || 0);

  const stripeWithdrawalDisabled =
    stripeWithdrawal &&
    (!stripe ||
      !elements ||
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
      !withdrawalInfo.website);

  const withdrawalDisabled =
    !stripeWithdrawal &&
    (!withdrawalInfo.name || withdrawalInfo.cardNumber.length < 16);

  const submitDisabled =
    processing || stripeWithdrawalDisabled || withdrawalDisabled;

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

    if (stripeWithdrawal) {
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
          birthDate: JSON.stringify({
            day: withdrawalInfo.birthDate.date(),
            month: withdrawalInfo.birthDate.month() + 1,
            year: withdrawalInfo.birthDate.year(),
          }),
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

      const ipInfo = await (await fetch('https://ipapi.co/json')).json();
      const createWithdrawalTransactionRes = await createWithdrawalTransaction({
        variables: {
          amount: amount * 100,
          token: token.id,
          ip: ipInfo.ip,
          paymentMethodId: paymentMethod.id,
        },
      });
      const withdrawalTransaction =
        createWithdrawalTransactionRes.data?.createWithdrawalTransaction;
      if (!withdrawalTransaction?.id) {
        throw new window.Error('WithdrawalTransaction id was not received');
      }

      await checkBalanceTransaction({
        variables: {
          type: TRANSACTION_TYPE,
          paymentId: withdrawalTransaction.id,
        },
      });
    } else {
      await createManualTransaction({
        variables: {
          amount: amount * 100,
          cardNumber: withdrawalInfo.cardNumber,
          fullName: withdrawalInfo.name,
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
        (window as any).gtag('event', `balance_${TRANSACTION_TYPE}_fail`);
        (window as any).fbq('trackCustom', `balance_${TRANSACTION_TYPE}_fail`, {
          error: e.message || e,
        });
      } finally {
        setProcessing(false);
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
        <FormControl
          margin='normal'
          fullWidth
          variant='outlined'
          style={{ textAlign: 'start' }}
        >
          <InputLabel id='country'>{t('Country')}</InputLabel>
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

        {!stripeWithdrawal && (
          <TextField
            label={t('Card Number')}
            name='cardNumber'
            value={withdrawalInfo.cardNumber}
            onChange={(e) =>
              setWithdrawalInfo({ ...withdrawalInfo, cardNumber: e.target.value })
            }
            variant='outlined'
            margin='normal'
            fullWidth
          />
        )}

        {stripeWithdrawal && (
          <Box className={c.cardField}>
            <CardElement
              options={{ hidePostalCode: true }}
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
        )}

        <TextField
          type='number'
          label={
            notEnoughtMoneyForWithdrawal
              ? t('Insufficient funds for withdrawal')
              : t('Withdrawal amount')
          }
          name={TRANSACTION_TYPE + '-amount'}
          placeholder='0'
          error={notEnoughtMoneyForWithdrawal}
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

        <TextField
          label={t('Full Name')}
          name='name'
          value={withdrawalInfo.name}
          onChange={handleWithdrawalInfoChange}
          variant='outlined'
          margin='normal'
          fullWidth
        />

        {stripeWithdrawal && (
          <>
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
          ) : (
            t('Withdraw funds')
          )}
        </Button>

        {stripeWithdrawal && (
          <Typography
            variant='caption'
            color='textSecondary'
            display='block'
            style={{ marginTop: 10, fontSize: '0.85rem' }}
          >
            {t('By registering your account in Stripe for withdrawal, you agree to')}{' '}
            <Link target='_blank' href='https://stripe.com/legal'>
              {t('Stripe Services Agreement')}
            </Link>{' '}
            {t('and')}{' '}
            <Link target='_blank' href='https://stripe.com/connect-account/legal'>
              {t('Stripe Connected Account Agreement')}
            </Link>
            .
          </Typography>
        )}
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
            {t('Withdrawal request successfully completed')}
          </Typography>

          <Typography className={c.successAlertText}>
            {t('Funds will be credited to the card you specified')}{' '}
            <Hidden xsDown>
              <br />
            </Hidden>
            {t('within 2-7 business days')}
          </Typography>

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
      // [t.breakpoints.up('md')]: {
      //   padding: t.spacing(3.2, 1.75, 2.4),
      //   borderRadius: t.shape.borderRadius * 1.5,
      // },
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
    successAlertText: {
      fontWeight: t.typography.body2.fontWeight,
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
    },
  }),
);

export const stripeCurrencies: { name: string; sign: string }[] = [
  { name: 'usd', sign: '$' },
  // { name: 'rub', sign: '₽' },
];

const countries = Countries.getNames();
const supportedWithdrawalCountries: any = {
  US: 'United States of America',
  AR: 'Argentina',
  AU: 'Australia',
  AT: 'Austria',
  BE: 'Belgium',
  BO: 'Bolivia',
  BR: 'Brazil',
  BG: 'Bulgaria',
  CA: 'Canada',
  CL: 'Chile',
  CO: 'Colombia',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  EC: 'Ecuador',
  EG: 'Egypt',
  EE: 'Estonia',
  FI: 'Finland',
  FR: 'France',
  DE: 'Germany',
  GR: 'Greece',
  HK: 'Hong Kong',
  IN: 'India',
  ID: 'Indonesia',
  IE: 'Ireland',
  IT: 'Italy',
  JP: 'Japan',
  LV: 'Latvia',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MT: 'Malta',
  MX: 'Mexico',
  NL: 'Netherlands',
  NZ: 'New Zealand',
  NO: 'Norway',
  PY: 'Paraguay',
  PL: 'Poland',
  PT: 'Portugal',
  RO: 'Romania',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  ZA: 'South Africa',
  ES: 'Spain',
  SE: 'Sweden',
  CH: 'Switzerland',
  TH: 'Thailand',
  GB: 'United Kingdom',
};

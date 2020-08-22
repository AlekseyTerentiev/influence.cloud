import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { useUpsertUser } from 'gql/user';
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Hidden,
  CircularProgress,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import figures from 'img/figures.svg';
import { Error } from 'components/error';
import 'react-phone-number-input/style.css';
import { PhoneInput } from 'components/account/phone-input';

export interface SignUpCompletePageProps extends RouteComponentProps {}

const locationInfo = {
  country: '',
  city: '',
  region: '',
  timezone: '',
};

export const SignUpCompletePage: FC<SignUpCompletePageProps> = () => {
  const { t, i18n } = useTranslation();
  const c = useStyles();

  const [upsertUser, { loading: upsertingUser, error }] = useUpsertUser();

  const [userData, setUserData] = useState<any>({
    nickname: '',
    givenName: '',
    familyName: '',
    gender: '',
    phone: '',
  });

  useEffect(() => {
    fetch('http://ip-api.com/json')
      .then((res) => res.json())
      .then((ipInfo) => {
        locationInfo.country = ipInfo.country;
        locationInfo.city = ipInfo.city;
        locationInfo.region = ipInfo.regionName;
        locationInfo.timezone = ipInfo.timezone;
      });
  }, []);

  const [birthDate, handleBirthDateChange] = useState<any>(null);

  function handleChange(e: ChangeEvent<any>) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    upsertUser({
      variables: {
        ...locationInfo,
        ...userData,
        birthDate,
        language: i18n.language.split('-')[0],
        locale: i18n.language,
      },
    });
  }

  return (
    <>
      <form
        className={c.root}
        onSubmit={handleSubmit}
        // noValidate
        // autoComplete="off"
      >
        <Typography variant='h4' align='center' style={{ marginBottom: 6 }}>
          {t('Welcome to Earnon Social!')}
        </Typography>

        <Typography
          align='center'
          variant='body2'
          color='textSecondary'
          style={{ marginBottom: 14 }}
        >
          {t('To complete the registration')}
          <br />
          {t('enter your details')}
        </Typography>

        <Box mt={1.5} />

        <TextField
          label={t('Nickname')}
          id='nickname'
          name='nickname'
          value={userData.nickname}
          onChange={handleChange}
          variant='outlined'
          margin='dense'
          fullWidth
        />

        <TextField
          label={t('Given Name')}
          id='givenName'
          name='givenName'
          value={userData.givenName}
          onChange={handleChange}
          variant='outlined'
          margin='dense'
          fullWidth
        />

        <TextField
          label={t('Family Name')}
          id='familyName'
          name='familyName'
          value={userData.familyName}
          onChange={handleChange}
          variant='outlined'
          margin='dense'
          fullWidth
        />

        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel id='gender-label'>{t('Gender')}</InputLabel>
          <Select
            labelId='gender-label'
            id='gender'
            name='gender'
            value={userData.gender}
            onChange={handleChange}
          >
            <MenuItem value='male'>{t('Male')}</MenuItem>
            <MenuItem value='female'>{t('Female')}</MenuItem>
            <MenuItem value='unknown'>{t('Other')}</MenuItem>
          </Select>
        </FormControl>

        {/* <TextField
          type='date'
          label={t('Birthday')}
          id='birthDate'
          name='birthDate'
          value={userData.birthDate}
          onChange={handleChange}
          error={showErrors && !userData.birthDate}
          variant='outlined'
          margin='dense'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        /> */}

        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel shrink={!!birthDate}>{t('Birthday')}</InputLabel>
          <DatePicker
            id='birthDate'
            name='birthDate'
            inputVariant='outlined'
            value={birthDate}
            initialFocusedDate={new Date('1999-01-01')}
            format='MM.DD.YYYY'
            onChange={handleBirthDateChange}
            variant='inline'
            autoOk={true}
          />
        </FormControl>

        {/* <TextField
          type='tel'
          label={t('Phone')}
          id='phone'
          name='phone'
          value={userData.phone}
          onChange={handleChange}
          // pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          variant='outlined'
          margin='dense'
          fullWidth
        /> */}

        <PhoneInput
          value={userData.phone}
          onChange={(phone) => {
            setUserData({
              ...userData,
              phone,
            });
          }}
        />

        {error && <Error error={error} />}

        <Box mt={1} />

        <Button
          type='submit'
          color='primary'
          size='large'
          variant='contained'
          fullWidth
          disabled={
            !userData.nickname ||
            !userData.givenName ||
            !userData.familyName ||
            !userData.gender ||
            !userData.phone ||
            !birthDate ||
            upsertingUser
          }
        >
          {upsertingUser ? (
            <CircularProgress style={{ width: 28, height: 28 }} />
          ) : (
            t('Submit')
          )}
        </Button>
      </form>

      <Hidden smDown>
        <img
          src={figures}
          style={{ position: 'absolute', left: '15%', top: '35%' }}
          alt='img'
        />
        <img
          src={figures}
          style={{
            position: 'absolute',
            left: '15%',
            bottom: '15%',
            transform: 'scaleY(-1)',
          }}
          alt='img'
        />
        <img
          src={figures}
          style={{
            position: 'absolute',
            right: '15%',
            top: '35%',
            transform: 'scaleX(-1)',
          }}
          alt='img'
        />
        <img
          src={figures}
          style={{
            position: 'absolute',
            right: '15%',
            bottom: '15%',
            transform: 'scaleY(-1) scaleX(-1)',
          }}
          alt='img'
        />
      </Hidden>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      margin: 'auto',
      padding: theme.spacing(4, 0),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 0),
      },
    },
    phoneInput: {
      position: 'absolute',
      width: '100%',
      top: '70%',
      transform: 'translateY(-50%)',
      padding: theme.spacing(0, 2),
      '& input': {
        padding: 0,
        paddingLeft: 4,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize + 1,
        fontWeight: theme.typography.fontWeightMedium,
        background: 'transparent',
        border: 'none',
        '&::placeholder': {
          color: 'rgba(52, 55, 76, 0.7)',
          fontWeight: theme.typography.fontWeightRegular,
        },
        '&:focus': {
          outline: 'none',
        },
      },
      '& .PhoneInputCountry': {
        '--PhoneInputCountryFlag-height': '0.8em',
      },
      '& .PhoneInputCountrySelectArrow': {
        borderStyle: 'solid',
        borderTopWidth: '0',
        borderBottomWidth: 'var(--PhoneInputCountrySelectArrow-borderWidth)',
        borderLeftWidth: '0',
        borderRightWidth: 'var(--PhoneInputCountrySelectArrow-borderWidth)',
      },
    },
  }),
);

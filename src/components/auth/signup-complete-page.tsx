import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
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
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import figures from 'img/figures.svg';

export interface SignUpCompletePageProps extends RouteComponentProps {}

export const SignUpCompletePage: FC<SignUpCompletePageProps> = () => {
  const { t, i18n } = useTranslation();
  const c = useStyles();

  const [upsertUser, { loading: upsertingUser, error }] = useUpsertUser();

  const [showErrors, setShowErrors] = useState(false);
  const [userData, setState] = useState<any>({
    nickname: '',
    givenName: '',
    familyName: '',
    gender: '',
    phone: '',
  });

  const [birthDate, handleBirthDateChange] = useState<any>(null);

  function handleChange(e: ChangeEvent<any>) {
    setShowErrors(false);
    setState({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    for (let v in userData) {
      if (!userData[v]) {
        return setShowErrors(true);
      }
    }

    upsertUser({
      variables: {
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
        noValidate
        // autoComplete="off"
      >
        <Typography variant='h4' align='center' style={{ marginBottom: 6 }}>
          {t('Welcome to Influence Cloud!')}
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
          error={showErrors && !userData.nickname}
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
          error={showErrors && !userData.givenName}
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
          error={showErrors && !userData.familyName}
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
            error={showErrors && !userData.gender}
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

        <TextField
          type='tel'
          label={t('Phone')}
          id='phone'
          name='phone'
          value={userData.phone}
          onChange={handleChange}
          error={showErrors && !userData.phone}
          // pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          variant='outlined'
          margin='dense'
          fullWidth
        />

        <Box mt={1.7} />

        <Button
          type='submit'
          color='primary'
          size='large'
          variant='contained'
          fullWidth
          disabled={upsertingUser}
        >
          {t('Submit')}
        </Button>

        {error && (
          <Typography color='error' style={{ marginTop: 14 }}>
            {error.message}
          </Typography>
        )}
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
  }),
);

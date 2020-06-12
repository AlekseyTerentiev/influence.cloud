import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { useUpsertUser } from 'gql';
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
import figures from 'img/figures.svg';

export interface SignUpCompletePageProps extends RouteComponentProps {
  onComplete?: () => void;
}

export const SignUpCompletePage: FC<SignUpCompletePageProps> = ({ onComplete }) => {
  const { t, i18n } = useTranslation();
  const c = useStyles();

  const [showErrors, setShowErrors] = useState(false);
  const [state, setState] = useState<any>({
    nickname: '',
    givenName: '',
    familyName: '',
    gender: '',
    birthDate: '',
    phone: '',
  });

  const [upsertUser, { loading: creatingUser }] = useUpsertUser();

  function handleChange(e: ChangeEvent<any>) {
    setShowErrors(false);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    for (let v in state) {
      if (!state[v]) {
        return setShowErrors(true);
      }
    }

    await upsertUser({
      variables: {
        ...state,
        birthDate: new Date(state.birthDate),
        language: i18n.language.split('-')[0],
        locale: i18n.language,
      },
    });

    if (onComplete) {
      onComplete();
    }
  }

  return (
    <>
      <form
        className={c.form}
        onSubmit={handleSubmit}
        noValidate
        // autoComplete="off"
      >
        <Typography variant='h6' align='center' style={{ marginBottom: 4 }}>
          {t('Welcome to Influence Cloud!')}
        </Typography>

        <Typography align='center'>
          {t('To complete the registration')}
          <br />
          {t('enter your details')}
        </Typography>

        <Box mt={1.5} />

        <TextField
          label={t('Nickname')}
          id='nickname'
          name='nickname'
          value={state.nickname}
          onChange={handleChange}
          error={showErrors && !state.nickname}
          variant='outlined'
          margin='dense'
          fullWidth
        />

        <TextField
          label={t('Given Name')}
          id='givenName'
          name='givenName'
          value={state.givenName}
          onChange={handleChange}
          error={showErrors && !state.givenName}
          variant='outlined'
          margin='dense'
          fullWidth
        />

        <TextField
          label={t('Family Name')}
          id='familyName'
          name='familyName'
          value={state.familyName}
          onChange={handleChange}
          error={showErrors && !state.familyName}
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
            value={state.gender}
            onChange={handleChange}
            error={showErrors && !state.gender}
          >
            <MenuItem value='male'>{t('Male')}</MenuItem>
            <MenuItem value='female'>{t('Female')}</MenuItem>
            <MenuItem value='unknown'>{t('Other')}</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type='date'
          label={t('Birthday')}
          id='birthDate'
          // defaultValue='2017-05-24'
          name='birthDate'
          value={state.birthDate}
          onChange={handleChange}
          error={showErrors && !state.birthDate}
          variant='outlined'
          margin='dense'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          type='tel'
          label={t('Phone')}
          id='phone'
          name='phone'
          value={state.phone}
          onChange={handleChange}
          error={showErrors && !state.phone}
          // pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          variant='outlined'
          margin='dense'
          fullWidth
        />

        <Box mt={2} />

        <Button
          type='submit'
          color='primary'
          size='large'
          variant='contained'
          fullWidth
          disabled={creatingUser}
        >
          {t('Submit')}
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
    form: {
      maxWidth: 400,
      margin: 'auto',
      padding: theme.spacing(4, 0),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 0),
      },
    },
  }),
);

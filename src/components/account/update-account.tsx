import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { useUpdateInstagramAccount } from 'gql';
import { AccountType } from 'gql/types/globalTypes';
import { LocationInput } from 'components/location-input';

export interface UpdateAccountProps {
  id: number;
  onComplete?: () => void;
}

export const UpdateAccount: FC<UpdateAccountProps> = ({ id, onComplete }) => {
  const { t, i18n } = useTranslation();
  const c = useStyles();

  const [accountType, setAccountType] = useState<AccountType>(AccountType.business);
  const [accountLocation, setAccountLocation] = useState<string>('');
  const userLanguage = i18n.language.split('-')[0];
  const [accountLanguage, setAccountLanguage] = useState<string>(userLanguage);
  if (!languages.find((l) => l.key === userLanguage)) {
    languages.push({ key: userLanguage, value: userLanguage });
  }

  const handleAccountTypeChange = (e: ChangeEvent<{ value: unknown }>) => {
    setAccountType(e.target.value as AccountType);
  };

  const handleAccountLocationChange = (value: string) => {
    setAccountLocation(value);
  };

  const handleAccountLanguageChange = (e: ChangeEvent<{ value: unknown }>) => {
    setAccountLanguage(e.target.value as string);
  };

  const [
    updateInstagramAccount,
    { loading: updating, error: updatingError },
  ] = useUpdateInstagramAccount();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const locParsed = accountLocation.split(', ');
    const city = locParsed[0];
    const region = locParsed.length === 3 ? locParsed[1] : '';
    const country = locParsed[locParsed.length - 1];
    await updateInstagramAccount({
      variables: {
        id,
        accountType,
        city,
        region,
        country,
        language: accountLanguage,
      },
    });

    if (onComplete) {
      onComplete();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={c.root}>
      <Typography style={{ marginBottom: 20 }}>
        Почти все готово, укажите некоторую информацию аккаунта:
      </Typography>

      <FormControl fullWidth variant='outlined' style={{ textAlign: 'start' }}>
        <InputLabel id='account_type'>{t('Account Type')}</InputLabel>
        <Select
          labelId='account_type'
          id='account_type'
          name='account_type'
          value={accountType}
          onChange={handleAccountTypeChange}
          style={{ textTransform: 'capitalize' }}
        >
          {Object.keys(AccountType).map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={{ textTransform: 'capitalize' }}
            >
              {t(type)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box my={1.25}>
        <LocationInput
          onChange={handleAccountLocationChange}
          label={t('Account City')}
          name='account_location'
        />
      </Box>

      <FormControl fullWidth variant='outlined' style={{ textAlign: 'start' }}>
        <InputLabel id='account_language'>{t('Account Language')}</InputLabel>
        <Select
          labelId='account_type'
          id='account_type'
          name='account_type'
          value={accountLanguage}
          onChange={handleAccountLanguageChange}
          style={{ textTransform: 'capitalize' }}
        >
          {languages.map(({ key, value }) => (
            <MenuItem key={key} value={key} style={{ textTransform: 'capitalize' }}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type='submit'
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        disabled={!accountType || !accountLanguage || !accountLocation || updating}
        style={{ marginTop: 10, marginBottom: 16 }}
      >
        {updating ? (
          <CircularProgress style={{ width: 24, height: 24 }} />
        ) : (
          t('Submit')
        )}
      </Button>

      <Typography variant='body2' gutterBottom>
        Предоставленная мной информация достоверна. Я понимаю, что ложные данные
        могут привести к деактивации аккаунта.
      </Typography>

      <Typography color='error' style={{ marginBottom: 20 }}>
        {updatingError && updatingError.message}
      </Typography>
    </form>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  }),
);

export const languages = [
  { key: 'en', value: 'English' },
  { key: 'hi', value: 'Hindi' },
  { key: 'it', value: 'Italian' },
  { key: 'ru', value: 'Russian' },
  { key: 'es', value: 'Spanish' },
];

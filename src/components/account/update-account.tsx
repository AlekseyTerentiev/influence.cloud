import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
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
import { useUpdateInstagramAccount } from 'gql/instagram-accounts';
import { AccountType } from 'gql/types/globalTypes';
import { LocationInput } from 'components/location-input';
import { Error } from 'components/error';

export interface UpdateAccountProps {
  id: number;
  onComplete?: () => void;
}

export const UpdateAccount: FC<UpdateAccountProps> = ({ id, onComplete }) => {
  const { t, i18n } = useTranslation();
  const c = useStyles();

  const [accountType, setAccountType] = useState<AccountType>(AccountType.actor);
  const [accountLocation, setAccountLocation] = useState<string>('');
  const userLanguage = i18n.language.split('-')[0];
  const [accountLanguage, setAccountLanguage] = useState<string>(userLanguage);
  if (!accountLanguages.find((l) => l.key === userLanguage)) {
    accountLanguages.push({ key: userLanguage, value: userLanguage });
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

  // @ts-ignore
  // @ts-ignore
  return (
    <form onSubmit={handleSubmit} className={c.root}>
      <Typography style={{ marginBottom: 20 }}>
        {t('You are almost done, enter some account information:')}
      </Typography>

      <FormControl fullWidth variant='outlined' style={{ textAlign: 'start' }}>
        <InputLabel id='account-type'>{t('Account Type')}</InputLabel>
        <Select
          labelId='account-type'
          name='account-type'
          value={accountType}
          onChange={handleAccountTypeChange}
          style={{ textTransform: 'capitalize' }}
        >
          {Object.entries(AccountType).map(([key, value]) => (
            <MenuItem
              key={key}
              value={value}
              style={{ textTransform: 'capitalize' }}
            >
              {t(key)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box my={1.1}>
        <LocationInput
          onChange={handleAccountLocationChange}
          label={t('Account City')}
          name='account-location'
        />
      </Box>

      <FormControl fullWidth variant='outlined' style={{ textAlign: 'start' }}>
        <InputLabel id='account-language'>{t('Account Language')}</InputLabel>
        <Select
          labelId='account-language'
          name='account-language'
          value={accountLanguage}
          onChange={handleAccountLanguageChange}
          style={{ textTransform: 'capitalize' }}
        >
          {accountLanguages.map(({ key, value }) => (
            <MenuItem key={key} value={key} style={{ textTransform: 'capitalize' }}>
              {t(value)}
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
          <CircularProgress style={{ width: 28, height: 28 }} />
        ) : (
          t('Submit')
        )}
      </Button>

      <Typography variant='body2' gutterBottom>
        {t(
          'The information I have provided is accurate. I understand that false data may lead to account deactivation.',
        )}
      </Typography>

      {updatingError && <Error error={updatingError} />}
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

export const accountLanguages = [
  { key: 'en', value: 'English' },
  { key: 'zh', value: 'Chinese' },
  { key: 'cs', value: 'Czech' },
  { key: 'fr', value: 'French' },
  { key: 'de', value: 'German' },
  { key: 'el', value: 'Greek' },
  { key: 'hi', value: 'Hindi' },
  { key: 'id', value: 'Indonesian' },
  { key: 'it', value: 'Italian' },
  { key: 'ja', value: 'Japanese' },
  { key: 'jv', value: 'Javanese' },
  { key: 'ko', value: 'Korean' },
  { key: 'pl', value: 'Polish' },
  { key: 'pt', value: 'Portuguese' },
  { key: 'ro', value: 'Romanian' },
  { key: 'ru', value: 'Russian' },
  { key: 'es', value: 'Spanish' },
  { key: 'te', value: 'Telugu' },
  { key: 'tr', value: 'Turkish' },
  { key: 'uk', value: 'Ukrainian' },
  { key: 'vi', value: 'Vietnamese' },
];

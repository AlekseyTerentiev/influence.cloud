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
import { LocationInput } from 'components/common/location-input';
import { Error } from 'components/common/error';
import { AccountLanguage, Gender } from 'gql/types/globalTypes';
import { LanguageSelect } from 'components/common/input/language-select';
import { GenderSelect } from 'components/common/input/gender-select';
import { DatePicker } from '@material-ui/pickers';

export interface UpdateAccountProps {
  id: number;
  onComplete?: () => void;
}

export const UpdateAccount: FC<UpdateAccountProps> = ({ id, onComplete }) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [type, setType] = useState<AccountType>(AccountType.actor);
  const [location, setLocation] = useState<string>('');
  const [language, setLanguage] = useState<AccountLanguage>(AccountLanguage.en);
  const [ownerGender, setOwnerGender] = useState<Gender>(Gender.male);
  const [ownerBirthDate, setOwnerBirthDate] = useState<any>();

  const handleTypeChange = (e: ChangeEvent<{ value: unknown }>) => {
    setType(e.target.value as AccountType);
  };
  const handleLocationChange = (value: string) => {
    setLocation(value);
  };
  const handleLanguageChange = (e: ChangeEvent<{ value: unknown }>) => {
    setLanguage(e.target.value as AccountLanguage);
  };
  const handleOwnerGenderChange = (e: ChangeEvent<{ value: unknown }>) => {
    setOwnerGender(e.target.value as Gender);
  };

  const [
    updateInstagramAccount,
    { loading: updating, error: updatingError },
  ] = useUpdateInstagramAccount();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const locParsed = location.split(', ');
    const city = locParsed[0];
    const region = locParsed.length === 3 ? locParsed[1] : '';
    const country = locParsed[locParsed.length - 1];
    await updateInstagramAccount({
      variables: {
        id,
        accountType: type,
        city,
        region,
        country,
        language,
        ownerGender,
        ownerBirthDate,
      },
    });

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={c.root}>
      <Typography style={{ marginBottom: 20 }}>
        {t('You are almost done, enter some information:')}
      </Typography>

      <Box mb={0.75}>
        <LocationInput
          onChange={handleLocationChange}
          label={t('Account City')}
          name='account-location'
        />
      </Box>

      <Box display='flex'>
        <FormControl
          fullWidth
          variant='outlined'
          margin='dense'
          style={{ textAlign: 'start' }}
        >
          <InputLabel id='account-type'>{t('Account Type')}</InputLabel>
          <Select
            labelId='account-type'
            name='account-type'
            value={type}
            onChange={handleTypeChange}
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

        <Box ml={1.25} />

        <LanguageSelect
          value={language}
          onChange={handleLanguageChange}
          label={t('Account Language')}
        />
      </Box>

      <Box display='flex'>
        <GenderSelect
          value={ownerGender}
          onChange={handleOwnerGenderChange}
          label='Your Gender'
        />
        <Box ml={1.25} />
        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel shrink={true}>Your Birthday</InputLabel>
          <DatePicker
            id='birthDate'
            name='birthDate'
            inputVariant='outlined'
            value={ownerBirthDate}
            initialFocusedDate={new Date('1999-01-01')}
            format='MM.DD.YYYY'
            onChange={(birthDate) => setOwnerBirthDate(birthDate)}
            variant='inline'
            autoOk={true}
          />
        </FormControl>
      </Box>

      <Button
        type='submit'
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        disabled={
          !type ||
          !language ||
          !location ||
          !ownerGender ||
          !ownerBirthDate ||
          updating
        }
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

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  }),
);

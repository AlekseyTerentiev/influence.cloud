import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
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

export interface UpdateAccountProps {
  username: string;
  onComplete?: () => void;
}

export const UpdateAccount: FC<UpdateAccountProps> = ({ username, onComplete }) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [accountType, setAccountType] = useState<AccountType>(AccountType.business);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setAccountType(event.target.value as AccountType);
  };

  const [
    updateInstagramAccount,
    { loading: updating, error: updatingError },
  ] = useUpdateInstagramAccount();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await updateInstagramAccount({
      variables: {
        username,
        accountType,
      },
    });

    if (onComplete) {
      onComplete();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography gutterBottom>
        Почти все готово, укажите тематику вашего блога:
      </Typography>

      <FormControl
        fullWidth
        margin='dense'
        variant='outlined'
        style={{ textAlign: 'start' }}
      >
        <InputLabel id='account_type'>{t('Account Type')}</InputLabel>
        <Select
          labelId='account_type'
          id='account_type'
          name='account_type'
          value={accountType}
          onChange={handleChange}
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

      <Button
        type='submit'
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        disabled={updating}
        style={{ marginTop: 8, marginBottom: 16 }}
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

      <Typography color='error' style={{ marginTop: 8 }}>
        {updatingError && updatingError.message}
      </Typography>
    </form>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

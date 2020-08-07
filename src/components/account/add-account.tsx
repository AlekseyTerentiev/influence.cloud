import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useUpsertInstagramAccount } from 'gql/instagram-accounts';
import { Error } from 'components/error';
import { Modal } from 'components/modal';
import instagramImg from 'img/instagram.svg';
import InstagramLogoImg from 'img/instagram_logo.png';
import { VerifyAccount } from './verify-account';
import { UpdateAccount } from './update-account';

export interface AddAccountProps {}

export const AddAccount: FC<AddAccountProps> = () => {
  const { t } = useTranslation();
  const c = useStyles();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [verified, setVerified] = useState(false);

  const [
    upsertInstagramAccount,
    { loading: upserting, data: upsertedData, error: upsertingError },
  ] = useUpsertInstagramAccount();

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleComplete() {
    setOpen(false);
  }
  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value.trim());
  }
  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    upsertInstagramAccount({
      variables: {
        username: username.startsWith('@') ? username.substr(1) : username,
      },
    });
  }

  return (
    <>
      <Button
        className={c.addAccountButton}
        size='large'
        variant='contained'
        color='primary'
        onClick={handleOpen}
      >
        <img alt='Instagram' src={instagramImg} />
        {t('Add')} Instagram
      </Button>

      <Modal open={open} onClose={handleClose} className={c.modal}>
        <img
          src={InstagramLogoImg}
          className={c.instagramLogo}
          alt='Instagram logo'
        />

        <Box pt={3} pb={4.5}>
          <Divider />
        </Box>

        {!upsertedData && (
          <form onSubmit={handleAddSubmit}>
            <Typography style={{ marginBottom: 20 }}>
              {t('Enter your Instagram account name')}
            </Typography>

            <TextField
              id='instagram-username'
              name='instagram-username'
              label={t('Instagram username')}
              autoFocus
              value={username}
              onChange={handleChangeUsername}
              fullWidth
              variant='outlined'
            />

            <Button
              type='submit'
              color='primary'
              variant='contained'
              size='large'
              fullWidth
              disabled={!username || upserting}
              style={{ marginTop: 12, minWidth: 200 }}
            >
              {upserting ? (
                <CircularProgress style={{ width: 24, height: 24 }} />
              ) : (
                t('Add') + ' ' + t('Account')
              )}
            </Button>

            {upsertingError && <Error error={upsertingError} />}

            <Box pt={5} pb={3}>
              <Divider />
            </Box>

            <Typography variant='body2'>
              {t(
                'We do not ask for a password for your account and you do not risk your data',
              )}
            </Typography>
          </form>
        )}

        {upsertedData && !verified && (
          <VerifyAccount
            username={upsertedData.upsertInstagramAccount.username}
            emojis={upsertedData.upsertInstagramAccount.emojis}
            onComplete={() => setVerified(true)}
          />
        )}

        {upsertedData && verified && (
          <UpdateAccount
            id={upsertedData.upsertInstagramAccount.id}
            onComplete={handleComplete}
          />
        )}
      </Modal>
    </>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAccountButton: {
      display: 'flex',
      alignItems: 'center',
    },
    modal: {
      textAlign: 'center',
    },
    instagramLogo: {
      marginTop: theme.spacing(1),
      width: 117,
      height: 41,
    },
  }),
);

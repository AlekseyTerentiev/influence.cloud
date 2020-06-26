import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Box,
  Slide,
  Dialog,
  IconButton,
  Typography,
  Divider,
  TextField,
  DialogContent,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useUpsertInstagramAccount } from 'gql';
import { TransitionProps } from '@material-ui/core/transitions';
import instagramImg from 'img/instagram.svg';
import CloseIcon from 'img/close.svg';
import InstagramLogoImg from 'img/instagram_logo.png';
import { VerifyAccount } from './verify-account';
import { UpdateAccount } from './update-account';

export interface AddAccountProps {}

export const AddAccount: FC<AddAccountProps> = () => {
  const { t } = useTranslation();
  const c = useStyles();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery('(max-width:420px)');
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'xs'}
        className={c.modal}
        TransitionComponent={SlideUpTransition}
        keepMounted
      >
        <DialogContent>
          <IconButton
            aria-label='Close'
            onClick={handleClose}
            className={c.closeButton}
          >
            <img style={{ width: 16, height: 16 }} src={CloseIcon} alt='Close' />
          </IconButton>

          <img
            src={InstagramLogoImg}
            className={c.instagramLogo}
            alt='Instagram logo'
          />

          <Box pt={3} pb={5}>
            <Divider />
          </Box>

          {!upsertedData && (
            <>
              {/* <Typography variant='h6' style={{ fontSize: '1.4rem' }}>
                Instagram {t('Profile')}
              </Typography> */}

              <form onSubmit={handleAddSubmit}>
                <Typography style={{ marginBottom: 20 }}>
                  Введите имя вашего аккаунта Instagram
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
                    t('Add Profile')
                  )}
                </Button>

                <Typography color='error' style={{ marginTop: 8 }}>
                  {upsertingError && upsertingError.message}
                </Typography>

                <Box pt={5} pb={3}>
                  <Divider />
                </Box>

                <Typography variant='body2'>
                  Мы не запрашиваем пароль от аккаунта и вы не рискуете своими
                  данными
                </Typography>
              </form>
            </>
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
        </DialogContent>
      </Dialog>
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
    closeButton: {
      color: '#bdbdbd',
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(2),
    },
    instagramLogo: {
      marginTop: theme.spacing(3),
      width: 117,
      height: 41,
    },
  }),
);

const SlideUpTransition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} timeout={350} />
  ),
);

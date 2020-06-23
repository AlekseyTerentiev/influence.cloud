import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAuth } from 'auth';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Button,
  Hidden,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { useUserSocialAccounts, useDeleteInstagramAccount } from 'gql';
import { AddAccount } from 'components/account/add-account';
import DeleteIcon from 'img/delete.svg';

interface AccountPageProps extends RouteComponentProps {}

export const AccountPage: React.FC<AccountPageProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  const {
    userSocialAccounts,
    loading: loadingSocialAccounts,
  } = useUserSocialAccounts('me');

  const socialAccount = userSocialAccounts && userSocialAccounts[0];
  const instagramAccount = socialAccount?.instagramAccount;

  const [
    deleteInstagramAccount,
    { loading: deletingInstagramAccount },
  ] = useDeleteInstagramAccount();

  const [deleteAccountDialogIsOpen, setDeleteAccountDialogIsOpen] = useState(false);
  function handleAccountDeleteDialogOpen() {
    setDeleteAccountDialogIsOpen(true);
  }

  function handleAccountDeleteDialogClose() {
    setDeleteAccountDialogIsOpen(false);
  }

  async function handleAccountDeleteDialogSubmit() {
    await deleteInstagramAccount({ variables: { id: instagramAccount?.id } });
    setDeleteAccountDialogIsOpen(false);
  }

  if (loadingSocialAccounts) {
    return null;
  }

  return (
    <Box className={c.root}>
      <Box className={c.user}>
        <Typography className={c.username}>{user.email}</Typography>
        <Button variant='text' color='primary' onClick={handleLogout}>
          выйти
        </Button>
      </Box>

      {!socialAccount?.verified || !instagramAccount?.accountType ? (
        <Box className={c.addAccountContainer}>
          <Typography>
            После добавления аккаунта вам станут доступны{' '}
            <Hidden xsDown>
              <br />
            </Hidden>
            выполнение заданий и статистика аккаунта.
          </Typography>
          <Box mt={2}>
            <AddAccount />
          </Box>
        </Box>
      ) : (
        <Box className={c.accountContainer}>
          <Avatar src={instagramAccount.profilePic} className={c.avatar} />
          <Typography className={c.accountUsername}>
            {instagramAccount.username}
            <IconButton
              aria-label='Delete'
              onClick={handleAccountDeleteDialogOpen}
              disabled={deletingInstagramAccount}
              className={c.deleteAccountBtn}
              size='small'
            >
              <img src={DeleteIcon} alt='Delete' />
            </IconButton>
          </Typography>

          <Typography color='textSecondary'>
            {instagramAccount.accountType}
          </Typography>

          <Dialog
            open={deleteAccountDialogIsOpen}
            onClose={handleAccountDeleteDialogClose}
            aria-labelledby='delete-account-dialog-title'
          >
            <DialogTitle id='delete-account-dialog-title'>
              {`${t('Delete')} ${t('account')} @${instagramAccount.username}`}?
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={handleAccountDeleteDialogClose}
                color='default'
                disabled={deletingInstagramAccount}
              >
                {t('Cancel')}
              </Button>
              <Button
                onClick={handleAccountDeleteDialogSubmit}
                color='secondary'
                autoFocus
                disabled={deletingInstagramAccount}
              >
                {t('Delete')}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    user: {
      position: 'absolute',
      top: theme.spacing(2),
      right: -6,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    username: {
      marginTop: 1,
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(0.8),
      },
    },
    addAccountContainer: {
      paddingTop: '26vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    accountContainer: {
      paddingTop: theme.spacing(11),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    avatar: {
      width: 70,
      height: 70,
      marginBottom: theme.spacing(1.2),
    },
    accountUsername: {
      position: 'relative',
      fontSize: '1.35rem',
    },
    deleteAccountBtn: {
      position: 'absolute',
      top: 7,
      marginLeft: 5,
      '& img': {
        width: 14,
        height: 14,
      },
    },
  }),
);

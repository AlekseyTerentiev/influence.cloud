import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
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
import { Loading } from 'components/loading';
import { Balance } from 'components/billing/balance';
import { Language } from 'components/language';
import { User } from 'components/user';
import { useDeleteInstagramAccount } from 'gql/instagram-accounts';
import { AddAccount } from 'components/account/add-account';
import DeleteIcon from 'img/delete.svg';

export interface AccountPageProps extends RouteComponentProps {}

export const AccountPage: FC<AccountPageProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading: loadingMe } = useMe();
  const accounts = me?.accounts || [];
  const myInstagramAccount = accounts[0]?.instagramAccount;

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
    if (!myInstagramAccount) {
      return;
    }
    await deleteInstagramAccount({ variables: { id: myInstagramAccount.id } });
    setDeleteAccountDialogIsOpen(false);
  }

  if (loadingMe) {
    return <Loading />;
  }

  return (
    <Box className={c.root}>
      <Box className={c.topBar}>
        {me && <Balance balance={me.balance?.balance || 0} />}
        <Box ml={2.9} />
        <Language />
        <User />
      </Box>

      {!myInstagramAccount || !myInstagramAccount.accountType ? (
        <Box className={c.addAccountBlock}>
          <Typography>
            {t('After adding an account, you will be able')}{' '}
            <Hidden xsDown>
              <br />
            </Hidden>
            {t('to complete tasks and account statistics.')}
          </Typography>
          <Box mt={2}>
            <AddAccount />
          </Box>
        </Box>
      ) : (
        <Box className={c.accountContainer}>
          <Avatar
            src={myInstagramAccount.profilePic || undefined}
            className={c.avatar}
          />
          <Typography className={c.accountUsername}>
            {myInstagramAccount.username}
            {/* <IconButton
              aria-label={t('Delete')}
              onClick={handleAccountDeleteDialogOpen}
              disabled={deletingInstagramAccount}
              className={c.deleteAccountBtn}
              size='small'
            >
              <img src={DeleteIcon} alt={t('Delete')} />
            </IconButton> */}
          </Typography>

          <Typography color='textSecondary' variant='body2'>
            {t(myInstagramAccount.accountType)}
          </Typography>

          <Dialog
            open={deleteAccountDialogIsOpen}
            onClose={handleAccountDeleteDialogClose}
            aria-labelledby='delete-account-dialog-title'
          >
            <DialogTitle id='delete-account-dialog-title'>
              {`${t('Delete')} ${t('account')} @${myInstagramAccount.username}`}?
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
    topBar: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      padding: theme.spacing(1.5, 0, 0.75),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    username: {
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(0.8),
      },
    },
    addAccountBlock: {
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
      width: 60,
      height: 60,
      marginBottom: theme.spacing(1.2),
    },
    accountUsername: {
      position: 'relative',
      fontSize: '1.35rem',
    },
    deleteAccountBtn: {
      position: 'absolute',
      top: '52%',
      transform: 'translateY(-50%)',
      marginLeft: 5,
      '& img': {
        width: 14,
        height: 14,
      },
    },
  }),
);

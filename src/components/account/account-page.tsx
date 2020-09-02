import React, { FC /*, useState*/ } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  // Button,
  Hidden,
  Avatar,
  // IconButton,
  // Dialog,
  // DialogTitle,
  // DialogActions,
} from '@material-ui/core';
import { Loading } from 'components/common/loading';
import { Balance } from 'components/billing/balance';
import { Language } from 'components/common/language';
import { User } from 'components/common/user';
// import { useDeleteInstagramAccount } from 'gql/instagram-accounts';
import { AddAccount } from 'components/account/add-account';
// import DeleteIcon from 'img/delete.svg';
import { Contact } from 'components/common/contact';

export interface AccountPageProps extends RouteComponentProps {}

export const AccountPage: FC<AccountPageProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading: loadingMe } = useMe();
  const accounts = me?.accounts || [];
  const myInstagramAccount = accounts[0]?.instagramAccount;

  // const [
  //   deleteInstagramAccount,
  //   { loading: deletingInstagramAccount },
  // ] = useDeleteInstagramAccount();

  // const [deleteAccountDialogIsOpen, setDeleteAccountDialogIsOpen] = useState(false);
  // const handleAccountDeleteDialogOpen = () => {
  //   setDeleteAccountDialogIsOpen(true);
  // }

  // const handleAccountDeleteDialogClose = () => {
  //   setDeleteAccountDialogIsOpen(false);
  // }

  // const handleAccountDeleteDialogSubmit = async () => {
  //   if (!myInstagramAccount) {
  //     return;
  //   }
  //   await deleteInstagramAccount({ variables: { id: myInstagramAccount.id } });
  //   setDeleteAccountDialogIsOpen(false);
  // }

  if (loadingMe) {
    return <Loading />;
  }

  return (
    <Box className={c.root}>
      <Box className={c.userBar}>
        <Contact className={c.contact} />
        {me && <Balance amount={me.balance?.balance || 0} />}
        <Language className={c.language} />
        <User className={c.user} />
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

          {/* <Dialog
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
          </Dialog> */}
        </Box>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    userBar: {
      display: 'flex',
      alignItems: 'center',
      padding: t.spacing(1.5, 0, 0.75),
      borderBottom: `1px solid ${t.palette.divider}`,
      [t.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    contact: {
      marginRight: 'auto',
    },
    language: {
      marginLeft: t.spacing(3),
    },
    user: {
      marginLeft: t.spacing(1),
    },
    username: {
      [t.breakpoints.up('md')]: {
        marginRight: t.spacing(0.8),
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
      paddingTop: t.spacing(11),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    avatar: {
      width: t.spacing(7.5),
      height: t.spacing(7.5),
      marginBottom: t.spacing(1.25),
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

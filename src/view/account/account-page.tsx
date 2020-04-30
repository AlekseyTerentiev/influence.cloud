import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useAuth0 } from 'auth0'
import { useStoreState, useStoreActions } from 'store'
import { useTranslation } from 'i18n'
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
} from '@material-ui/core'
import { AddAccount } from 'view/account/add-account'
import RemoveIcon from 'img/remove.svg'

export const AccountPage: React.FC<RouteComponentProps> = () => {
  const c = useStyles()
  const { t } = useTranslation()
  const { user, logout } = useAuth0()

  const { account, accountLoading, accountRemoving } = useStoreState(state => state.instagram)
  const { removeAccount } = useStoreActions(state => state.instagram)

  function handleLogout() {
    logout()
  }

  const [removeAccountDialogIsOpen, setRemoveAccountDialogIsOpen] = useState(false)
  function handleAccountRemoveDialogOpen() {
    setRemoveAccountDialogIsOpen(true)
  }

  function handleAccountRemoveDialogClose() {
    setRemoveAccountDialogIsOpen(false)
  }

  function handleAccountRemoveDialogSubmit() {
    removeAccount().then(() => setRemoveAccountDialogIsOpen(false))
  }

  return (
    <Box className={c.root}>
      <Box className={c.user}>
        <Typography className={c.username}>{user.name}</Typography>
        <Button variant='text' color='primary' onClick={handleLogout}>
          выйти
        </Button>
      </Box>

      {!account && (
        <Box className={c.addAccountContainer}>
          <Typography color='textSecondary'>
            После добавления аккаунта вам станут доступны{' '}
            <Hidden xsDown>
              <br />
            </Hidden>
            выполнение заданий и статистика аккаунта.
          </Typography>
          <Box mt={3}>
            <AddAccount />
          </Box>
        </Box>
      )}

      {account && (
        <Box className={c.accountContainer}>
          <Avatar src={account.avatar} className={c.avatar} />
          <Typography className={c.accountUsername}>
            {account.username}
            <IconButton
              aria-label='Remove'
              onClick={handleAccountRemoveDialogOpen}
              disabled={accountLoading || accountRemoving}
              className={c.removeAccountBtn}
              size='small'
            >
              <img src={RemoveIcon} alt='Remove' />
            </IconButton>
          </Typography>
        </Box>
      )}

      <Dialog
        open={removeAccountDialogIsOpen}
        onClose={handleAccountRemoveDialogClose}
        aria-labelledby='remove-account-dialog-title'
      >
        <DialogTitle id='remove-account-dialog-title'>
          {`${t('Remove')} ${t('account')} @${account?.username}`}?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleAccountRemoveDialogClose}
            color='default'
            disabled={accountRemoving}
          >
            {t('Cancel')}
          </Button>
          <Button
            onClick={handleAccountRemoveDialogSubmit}
            color='secondary'
            autoFocus
            disabled={accountRemoving}
          >
            {t('Remove')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

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
      width: 80,
      height: 80,
      marginBottom: theme.spacing(1),
    },
    accountUsername: {
      position: 'relative',
    },
    removeAccountBtn: {
      position: 'absolute',
      top: 1,
      marginLeft: 5,
      '& img': {
        width: 15,
        height: 15,
      },
    },
  })
)

import React from 'react'
import {
  makeStyles,
  createStyles,
  Theme,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  Button,
  Hidden,
} from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import { useAuth0 } from 'auth0'
import { AddAccount } from 'view/add-account'

export const AccountPage: React.FC<RouteComponentProps> = () => {
  const c = useStyles({})
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const { user, logout } = useAuth0()

  function handleLogout() {
    logout()
  }

  return (
    <Box className={c.root}>
      <Box className={c.user}>
        <Typography className={c.username}>
          {user && xsDown ? user.nickname : user.name}
        </Typography>{' '}
        <Button variant='text' color='primary' onClick={handleLogout}>
          выйти
        </Button>
      </Box>
      <Box className={c.addAccountContainer}>
        <Typography variant='body2' align='center' gutterBottom>
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
      marginTop: 1,
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(1),
      },
      fontWeight: theme.typography.fontWeightMedium,
    },
    addAccountContainer: {
      paddingTop: '26vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
)

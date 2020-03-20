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
import instagramImg from 'img/instagram.svg'
import { useAuth0 } from 'auth0'

export const Account: React.FC<RouteComponentProps> = () => {
  const c = useStyles({})
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const { user, logout } = useAuth0()

  return (
    <Box className={c.root}>
      <Box className={c.user}>
        <Typography>{user && xsDown ? user?.nickname : user?.name}</Typography>{' '}
        <Button variant='text' color='primary' size='small' onClick={() => logout()}>
          выйти
        </Button>
      </Box>
      <Box className={c.addAccountContainer}>
        <Typography color='textSecondary' align='center' gutterBottom>
          После добавления аккаунта вам станут доступны{' '}
          <Hidden xsDown>
            <br />
          </Hidden>
          выполнение заданий и статистика аккаунта.
        </Typography>
        <Button
          className={c.addAccountButton}
          size='large'
          variant='contained'
          color='primary'
        >
          <img alt='Instagram' src={instagramImg} className={c.addAccountButtonIcon} />
          Добавить аккаунт
        </Button>
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
      right: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    addAccountContainer: {
      paddingTop: '26vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    addAccountButton: {
      marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
    addAccountButtonIcon: {
      width: '1rem',
      marginRight: theme.spacing(1),
    },
  })
)

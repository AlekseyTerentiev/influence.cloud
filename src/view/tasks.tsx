import React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Hidden,
} from '@material-ui/core'
import instagramImg from 'img/instagram.svg'

export const Tasks: React.FC<RouteComponentProps> = () => {
  const c = useStyles({})

  return (
    <Box className={c.root}>
      <Typography color='textSecondary' align='center' gutterBottom>
        Вы находитесь в режиме выполнения заданий.{' '}
        <Hidden xsDown>
          <br />
        </Hidden>
        Для начала работы Вам необходимо добавить аккаунт
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
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

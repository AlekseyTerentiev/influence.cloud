import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { makeStyles, createStyles, Theme, Box, Typography, Hidden } from '@material-ui/core'
import { AddAccount } from 'view/add-account'

export const ExecutionPage: React.FC<RouteComponentProps> = () => {
  const c = useStyles({})

  return (
    <Box className={c.root}>
      <Typography variant='body2' align='center' gutterBottom>
        Вы находитесь в режиме выполнения заданий.{' '}
        <Hidden xsDown>
          <br />
        </Hidden>
        Для начала работы Вам необходимо добавить аккаунт
      </Typography>

      <Box mt={2}>
        <AddAccount />
      </Box>
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
  })
)

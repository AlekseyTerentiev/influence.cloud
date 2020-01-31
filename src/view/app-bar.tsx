import React, { ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import logoImg from 'img/logo.svg'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import Hidden from '@material-ui/core/Hidden'
import { navigate, Location } from '@reach/router'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

export function AppBar() {
  const c = useStyles({})

  function handleNavigate(e: ChangeEvent<{}>, route: string) {
    navigate(route)
  }

  return (
    <MuiAppBar className={c.root} position='sticky' color='inherit'>
      <Container>
        <Toolbar className={c.toolbar} disableGutters>
          <Box className={c.brand}>
            <img className={c.logo} src={logoImg} alt='Logo' />
            <Typography className={c.title}>Influence Cloud</Typography>
          </Box>

          <Hidden smDown>
            <Location>
              {({ location }): any => (
                <Tabs
                  className={c.tabs}
                  value={'/' + location.pathname.split('/')[1]}
                  onChange={handleNavigate}
                  TabIndicatorProps={{ hidden: true }}
                >
                  <Tab label={'Задания'} value='/' />
                  <Tab label={'Новая задача'} value='/create-task' />
                  <Tab label={'Аккаунт'} value='/account' />
                </Tabs>
              )}
            </Location>
          </Hidden>

          <Box ml='auto'>
            <FontAwesomeIcon icon={faGift} className={c.icon} />
            <Typography className={c.balance} display='inline'>
              {(1128).toLocaleString()}₽
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#464646',
      background: '#fff',
      borderBottom: '1px solid rgba(0,0,0,0.0975)',
      overflowX: 'scroll',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
    },
    tabs: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    logo: {
      height: '1.4rem',
      marginRight: theme.spacing(1),
    },
    title: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '0.9rem',
      lineHeight: '0.9rem',
    },
    icon: {
      fontSize: '1.1rem',
      marginRight: theme.spacing(1),
      color: '#555',
    },
    balance: {
      fontSize: '1.1rem',
      fontWeight: theme.typography.fontWeightMedium,
    },
  })
)

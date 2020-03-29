import React, { ChangeEvent } from 'react'
import { useStoreState } from 'store'
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Container,
  Typography,
  Hidden,
  Tabs,
  Tab,
} from '@material-ui/core'
import logoImg from 'img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { navigate, Location } from '@reach/router'
import { Currency } from 'view/billing/currency'

export function AppBar() {
  const { profile } = useStoreState(state => state.profile)

  function handleNavigate(e: ChangeEvent<{}>, route: string) {
    navigate(route)
  }

  const c = useStyles()

  return (
    <MuiAppBar className={c.root} position='sticky' color='inherit'>
      <Container>
        <Toolbar className={c.toolbar} disableGutters>
          <Box className={c.brand} onClick={() => navigate('/')}>
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
                  <Tab label={'Выполнить задание'} value='/' className={c.tab} />
                  <Tab label={'Добавить задание'} value='/create-task' className={c.tab} />
                  <Tab label={'Аккаунт'} value='/account' className={c.tab} />
                </Tabs>
              )}
            </Location>
          </Hidden>

          {profile && (
            <Box ml='auto'>
              <FontAwesomeIcon icon={faGift} className={c.icon} />
              <Typography className={c.balance} display='inline'>
                <Currency value={1128} />
              </Typography>
            </Box>
          )}
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
      transform: 'translateX(-59%)',
    },
    tab: {
      padding: theme.spacing(0, 3),
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

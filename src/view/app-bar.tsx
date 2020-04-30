import React, { ChangeEvent } from 'react'
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
  function handleNavigate(e: ChangeEvent<{}>, route: string) {
    navigate(route)
  }

  const c = useStyles()

  return (
    <MuiAppBar className={c.root} position='sticky' color='inherit'>
      <Container>
        <Toolbar className={c.toolbar} disableGutters>
          <Box className={c.brand} onClick={() => navigate('/')}>
            <img className={c.brandIcon} src={logoImg} alt='Logo' />
            <Typography className={c.brandText}>Influence Cloud</Typography>
          </Box>

          <Hidden smDown>
            <Location>
              {({ location }): any => (
                <Tabs
                  value={'/' + location.pathname.split('/')[1]}
                  onChange={handleNavigate}
                  TabIndicatorProps={{ hidden: true }}
                >
                  <Tab label={'Выполнить задание'} value='/' />
                  <Tab label={'Добавить задание'} value='/assignments' />
                  <Tab label={'Аккаунт'} value='/account' />
                </Tabs>
              )}
            </Location>
          </Hidden>

          <Box ml='auto'>
            <FontAwesomeIcon icon={faGift} className={c.icon} />
            <Typography className={c.balance} display='inline'>
              <Currency value={1128} />
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
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.25),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2.5),
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(7),
    },
    brandIcon: {
      marginRight: theme.spacing(1),
      height: 22,
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(1.25),
        height: 24,
      },
    },
    brandText: {
      fontFamily: 'Montserrat',
      fontWeight: theme.typography.fontWeightBold,
      letterSpacing: -0.3,
      fontSize: 15,
      [theme.breakpoints.up('sm')]: {
        fontSize: 17,
      },
    },
    icon: {
      fontSize: '1.1rem',
      marginRight: theme.spacing(1),
      color: '#555',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.4rem',
      },
    },
    balance: {
      fontSize: '1.1rem',
      fontWeight: theme.typography.fontWeightMedium,
      [theme.breakpoints.up('md')]: {
        fontSize: '1.4rem',
      },
    },
  })
)

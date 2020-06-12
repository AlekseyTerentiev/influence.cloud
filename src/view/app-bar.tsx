import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from 'gql';
import { navigate, Location } from '@reach/router';
import { TASKS_ROUTE, CREATE_TASK_ROUTE, ACCOUNT_ROUTE } from 'routes';
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
} from '@material-ui/core';
import logoImg from 'img/logo.svg';
import { Language } from 'view/language';
import { AppBarUser } from 'view/app-bar-user';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGift } from '@fortawesome/free-solid-svg-icons';
// import { Currency } from 'view/billing/currency';

export function AppBar() {
  const { t } = useTranslation();
  const c = useStyles();

  const { user, loading: userLoading } = useUser('me');

  function handleNavigate(e: ChangeEvent<{}>, route: string) {
    navigate(route);
  }

  return (
    <MuiAppBar className={c.root} position='static' color='inherit'>
      <Container>
        <Toolbar className={c.toolbar} disableGutters>
          <Box className={c.brand} onClick={() => navigate('/')}>
            <img className={c.brandIcon} src={logoImg} alt='Logo' />
            <Hidden xsDown>
              <Typography className={c.brandText}>Influence Cloud</Typography>
            </Hidden>
          </Box>

          {!userLoading && user && (
            <>
              <Hidden smDown>
                <Location>
                  {({ location }): any => (
                    <Tabs
                      value={'/' + location.pathname.split('/')[1]}
                      onChange={handleNavigate}
                      TabIndicatorProps={{ hidden: true }}
                    >
                      <Tab label={t('Tasks')} value={TASKS_ROUTE} />
                      <Tab label={t('Create task')} value={CREATE_TASK_ROUTE} />
                      <Tab label={t('Account')} value={ACCOUNT_ROUTE} />
                    </Tabs>
                  )}
                </Location>
              </Hidden>

              {/* <Box ml='auto'>
                <FontAwesomeIcon icon={faGift} className={c.icon} />
                <Typography className={c.balance} display='inline'>
                  <Currency value={1128} />
                </Typography>
              </Box> */}
            </>
          )}

          <Box ml='auto' />

          <Language />

          <Hidden smDown={!!user}>
            <AppBarUser />
          </Hidden>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(7),
      },
      cursor: 'pointer',
    },
    brandIcon: {
      marginRight: theme.spacing(1),
      height: 22,
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(1.25),
        height: 25,
      },
    },
    brandText: {
      fontFamily: 'Montserrat',
      color: '#484848',
      letterSpacing: -0.2,
      marginTop: 1,
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontSize: 17,
      },
    },
    // icon: {
    //   fontSize: '1.1rem',
    //   marginRight: theme.spacing(1),
    //   color: '#555',
    //   [theme.breakpoints.up('md')]: {
    //     fontSize: '1.4rem',
    //   },
    // },
    balance: {
      fontSize: '1.1rem',
      fontWeight: theme.typography.fontWeightMedium,
      [theme.breakpoints.up('md')]: {
        fontSize: '1.4rem',
      },
    },
  }),
);

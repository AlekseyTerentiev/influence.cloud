import React, { ChangeEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { navigate, Location } from '@reach/router';
import {
  TASKS_ROUTE,
  CREATE_TASK_ROUTE,
  ACCOUNT_ROUTE,
  BILLING_ROUTE,
} from 'routes';
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
  Button,
} from '@material-ui/core';
import logoImg from 'img/logo.svg';
import { Language } from 'components/language';
import { User } from 'components/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Currency } from 'components/billing/currency';

export function AppBar() {
  const { t } = useTranslation();
  const c = useStyles();

  const { me, loading: loadingMe } = useMe();

  function handleNavigate(e: ChangeEvent<{}>, route: string) {
    navigate(route);
  }

  function handleBalanceClick(e: MouseEvent) {
    e.preventDefault();
    navigate(BILLING_ROUTE);
  }

  return (
    <MuiAppBar className={c.root} position='static' color='inherit'>
      <Container>
        <Toolbar className={c.toolbar} disableGutters>
          <Box className={c.brand} onClick={() => navigate('/')}>
            <img className={c.brandIcon} src={logoImg} alt='Logo' />
            {/* <Hidden xsDown> */}
            <Typography className={c.brandText} noWrap>
              Influence Cloud
            </Typography>
            {/* </Hidden> */}
          </Box>

          {!loadingMe && me && (
            <Hidden smDown>
              <Location>
                {({ location }): any => (
                  <Tabs
                    value={'/' + location.pathname.split('/')[1]}
                    onChange={handleNavigate}
                    TabIndicatorProps={{ hidden: true }}
                  >
                    <Tab label={t('Tasks')} value={TASKS_ROUTE} />
                    <Tab label={t('Publish task')} value={CREATE_TASK_ROUTE} />
                    <Tab label={t('Account')} value={ACCOUNT_ROUTE} />
                  </Tabs>
                )}
              </Location>
            </Hidden>
          )}

          <Box ml='auto' />

          {me && (
            <Button
              variant='text'
              color='default'
              href={BILLING_ROUTE}
              className={c.balance}
              onClick={handleBalanceClick}
            >
              <FontAwesomeIcon icon={faWallet} className={c.balanceIcon} />
              <Currency value={me.balance?.balance || 0} />
            </Button>
          )}

          <Hidden smDown={!!me}>
            <Box ml={3.25} />
            <Language />
            <Box ml={0.75} />
            <User />
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
        marginRight: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(7),
      },
      cursor: 'pointer',
    },
    brandIcon: {
      marginRight: theme.spacing(1),
      marginBottom: 2,
      height: 21,
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(1.25),
        height: 25,
      },
    },
    brandText: {
      fontFamily: 'Montserrat',
      color: '#484848',
      letterSpacing: -0.2,
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontSize: 17,
      },
    },
    balance: {
      opacity: 0.85,
      padding: 0,
      fontSize: '1.1rem',
      fontWeight: theme.typography.fontWeightMedium,
      [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
      },
    },
    balanceIcon: {
      fontSize: '0.95rem',
      marginRight: theme.spacing(1),
      color: theme.palette.grey[700],
      [theme.breakpoints.up('md')]: {
        fontSize: '1.05rem',
        marginRight: theme.spacing(1.25),
        marginTop: 1,
      },
    },
  }),
);

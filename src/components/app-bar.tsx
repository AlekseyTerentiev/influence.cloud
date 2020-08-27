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
} from '@material-ui/core';
import logoImg from 'img/logo.svg';
import { Contact } from 'components/contact';
import { Language } from 'components/language';
import { User } from 'components/user';
import { Balance } from 'components/billing/balance';

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
            <Typography className={c.brandText} noWrap>
              Earnon Social
            </Typography>
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
                    <Tab label={t('Tasks')} value={TASKS_ROUTE} className={c.tab} />
                    <Tab
                      label={t('Publish task')}
                      value={CREATE_TASK_ROUTE}
                      className={c.tab}
                    />
                    <Tab
                      label={t('Account')}
                      value={ACCOUNT_ROUTE}
                      className={c.tab}
                    />
                  </Tabs>
                )}
              </Location>
            </Hidden>
          )}

          <Box ml='auto' />

          {me && <Balance balance={me.balance?.balance || 0} />}

          <Box ml={3.5} />
          <Contact />
          <Box ml={2.5} />
          <Language />
          <Box ml={1.25} />
          <User />
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
        marginRight: theme.spacing(3),
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(6),
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
      color: '#4e4e4e',
      letterSpacing: -0.1,
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontSize: 17,
      },
    },
    tab: {
      '&:not(:first-child)': {
        marginLeft: theme.spacing(0.5),
        [theme.breakpoints.up('lg')]: {
          marginLeft: theme.spacing(2),
        },
      },
    },
  }),
);

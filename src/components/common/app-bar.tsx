import React, { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { navigate, Location, Link } from '@reach/router';
import { EXECUTION_ROUTE, PUBLICATION_ROUTE, ACCOUNT_ROUTE } from 'routes';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  useMediaQuery,
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
import { ReactComponent as ListIcon } from 'img/list.svg';
import { ReactComponent as CheckIcon } from 'img/check.svg';
import { ReactComponent as UserIcon } from 'img/user.svg';
import { Contact } from 'components/common/contact';
import { Language } from 'components/common/language';
import { User } from 'components/common/user';
import { Balance } from 'components/billing/balance';

export const AppBar: FC = () => {
  const { t } = useTranslation();
  const c = useStyles();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const { me, loading: loadingMe } = useMe();

  const handleNavigate = (e: ChangeEvent<{}>, route: string) => {
    navigate(route);
  };

  return (
    <MuiAppBar className={c.root} position='static' color='inherit'>
      <Container>
        <Toolbar className={c.toolbar} disableGutters>
          <Link className={c.brand} to='/'>
            <img className={c.brandIcon} src={logoImg} alt='Logo' />
            <Typography className={c.brandText} noWrap>
              Earnon Social
            </Typography>
          </Link>

          {!loadingMe && me && (
            <Hidden xsDown>
              <Location>
                {({ location }): any => (
                  <Tabs
                    value={'/' + location.pathname.split('/')[1]}
                    onChange={handleNavigate}
                    TabIndicatorProps={{ hidden: true }}
                  >
                    <Tab
                      label={mdUp ? t('Tasks') : ''}
                      icon={mdUp ? undefined : <ListIcon />}
                      value={EXECUTION_ROUTE}
                      className={c.tab}
                    />
                    <Tab
                      label={mdUp ? t('Publish task') : ''}
                      icon={mdUp ? undefined : <CheckIcon />}
                      value={PUBLICATION_ROUTE}
                      className={c.tab}
                    />
                    <Tab
                      label={mdUp ? t('Account') : ''}
                      icon={mdUp ? undefined : <UserIcon />}
                      value={ACCOUNT_ROUTE}
                      className={c.tab}
                    />
                  </Tabs>
                )}
              </Location>
            </Hidden>
          )}

          <Box ml='auto' />

          {me && <Balance amount={me.balance?.balance || 0} />}

          <Contact className={c.contact} />
          <Language className={c.language} />
          {mdUp && <User className={c.user} />}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export const useStyles = makeStyles((t: Theme) =>
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
      marginRight: t.spacing(2),
      [t.breakpoints.up('md')]: {
        marginRight: t.spacing(4),
      },
      [t.breakpoints.up('lg')]: {
        marginRight: t.spacing(6),
      },
      cursor: 'pointer',
    },
    brandIcon: {
      marginRight: t.spacing(1),
      marginBottom: 2,
      height: 21,
      [t.breakpoints.up('md')]: {
        marginRight: t.spacing(1.25),
        height: 25,
      },
    },
    brandText: {
      fontFamily: 'Montserrat',
      color: '#4e4e4e',
      letterSpacing: -0.1,
      fontSize: 16,
      [t.breakpoints.up('sm')]: {
        fontSize: 17,
      },
      [t.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    tab: {
      '&:not(:first-child)': {
        marginLeft: t.spacing(0.5),
        [t.breakpoints.up('lg')]: {
          marginLeft: t.spacing(2),
        },
      },
    },
    contact: {
      marginLeft: t.spacing(3),
    },
    language: {
      marginLeft: t.spacing(2.75),
    },
    user: {
      marginLeft: t.spacing(1.5),
    },
  }),
);

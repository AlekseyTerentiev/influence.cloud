import React from 'react';
import { navigate, Location } from '@reach/router';
import { EXECUTION_ROUTE, PUBLICATION_ROUTE, ACCOUNT_ROUTE } from 'routes';
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { ReactComponent as ListIcon } from 'img/list.svg';
import { ReactComponent as CheckIcon } from 'img/check.svg';
import { ReactComponent as UserIcon } from 'img/user.svg';

export const BotNav = () => {
  const c = useStyles();

  return (
    <>
      <div className={c.offset} />
      <Location>
        {({ location }): any => (
          <div className={c.root}>
            <Container>
              <BottomNavigation
                value={'/' + location.pathname.split('/')[1]}
                onChange={(e, route) => navigate(route)}
                className={c.navigation}
              >
                <BottomNavigationAction
                  value={PUBLICATION_ROUTE}
                  icon={<ListIcon />}
                />
                <BottomNavigationAction
                  value={EXECUTION_ROUTE}
                  icon={<CheckIcon style={{ width: '1.05em', height: '1.05em' }} />}
                />
                <BottomNavigationAction
                  value={ACCOUNT_ROUTE}
                  icon={<UserIcon style={{ width: '0.85em', height: '0.85em' }} />}
                />
              </BottomNavigation>
            </Container>
          </div>
        )}
      </Location>
    </>
  );
};

const botNavHeight = 56;
const useStyles = makeStyles((t: Theme) =>
  createStyles({
    offset: {
      height: botNavHeight,
    },
    root: {
      background: 'white',
      zIndex: 9999,
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
    },
    navigation: {
      borderTop: `1px solid ${t.palette.divider}`,
      height: botNavHeight,
    },
  }),
);

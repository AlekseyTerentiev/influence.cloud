import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { navigate, Location } from '@reach/router';
import { EXECUTION_ROUTE, PUBLICATION_ROUTE, ACCOUNT_ROUTE } from 'routes';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as ListIcon } from 'img/list.svg';
import { ReactComponent as CheckIcon } from 'img/check.svg';
import { ReactComponent as UserIcon } from 'img/user.svg';

export const NavBot = () => {
  const c = useStyles();

  return (
    <>
      <div className={c.offset} />
      <Location>
        {({ location }): any => (
          <BottomNavigation
            className={c.root}
            value={'/' + location.pathname.split('/')[1]}
            onChange={(e, route) => navigate(route)}
          >
            <BottomNavigationAction value={PUBLICATION_ROUTE} icon={<ListIcon />} />
            <BottomNavigationAction
              value={EXECUTION_ROUTE}
              icon={<CheckIcon style={{ width: '1.05em', height: '1.05em' }} />}
            />
            <BottomNavigationAction
              value={ACCOUNT_ROUTE}
              icon={<UserIcon style={{ width: '0.85em', height: '0.85em' }} />}
            />
          </BottomNavigation>
        )}
      </Location>
    </>
  );
};

const height = 56;

const useStyles = makeStyles((t: Theme) =>
  createStyles({
    offset: {
      height: height,
    },
    root: {
      height: height,
    },
  }),
);

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { navigate, Location } from '@reach/router';
import { EXECUTION_ROUTE, ASSIGNMENTS_ROUTE, ACCOUNT_ROUTE } from 'routes';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlusSquare, faUser } from '@fortawesome/free-solid-svg-icons';

export const NavBot = () => {
  const c = useStyles({});

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
            <BottomNavigationAction
              value={EXECUTION_ROUTE}
              icon={<FontAwesomeIcon icon={faCheck} />}
            />
            <BottomNavigationAction
              value={ASSIGNMENTS_ROUTE}
              icon={<FontAwesomeIcon icon={faPlusSquare} />}
            />
            <BottomNavigationAction
              value={ACCOUNT_ROUTE}
              icon={<FontAwesomeIcon icon={faUser} />}
            />
          </BottomNavigation>
        )}
      </Location>
    </>
  );
};

const height = 50;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: {
      minHeight: height,
    },
    root: {
      zIndex: 1,
      height: height,
      borderTop: '1px solid rgba(0,0,0,0.0975)',
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  }),
);

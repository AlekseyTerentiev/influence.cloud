import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { navigate, Location } from '@reach/router';
import { TASKS_ROUTE, CREATE_TASK_ROUTE, ACCOUNT_ROUTE } from 'routes';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as CheckIcon } from 'img/check.svg';
import { ReactComponent as AddIcon } from 'img/add.svg';
import AntdIcon from '@ant-design/icons-react';
import { UserOutline as UserIcon /*, PlusOutline */ } from '@ant-design/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
// import { faPlus } from '@fortawesome/free-regular-svg-icons';
// import { AddIcon } from '@material-ui/icons';

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
            <BottomNavigationAction value={TASKS_ROUTE} icon={<CheckIcon />} />
            {/* <BottomNavigationAction value={CREATE_TASK_ROUTE} icon={<AddIcon />} /> */}
            <BottomNavigationAction value={CREATE_TASK_ROUTE} icon={<AddIcon />} />
            {/* <BottomNavigationAction
              value={CREATE_TASK_ROUTE}
              icon={<AntdIcon type={PlusOutline} />}
            /> */}
            <BottomNavigationAction
              value={ACCOUNT_ROUTE}
              icon={<AntdIcon type={UserIcon} />}
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
      backgroundColor: '#fbfbfb',
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

import React, { FC, HTMLAttributes, useState, MouseEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  IconButton,
  Popover,
  Avatar,
  Typography,
  Button,
} from '@material-ui/core';
import { ReactComponent as UserIcon } from 'img/user.svg';

export interface UserProps extends HTMLAttributes<HTMLDivElement> {}

export const User: FC<UserProps> = ({ ...otherProps }) => {
  const { t } = useTranslation();
  const c = useStyles();

  const { user, logout } = useAuth0();

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const popoverIsOpen = Boolean(popoverAnchorEl);
  const handleAccountPopupOpen = (e: MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(e.currentTarget);
  };
  const handlePopupClose = () => {
    setPopoverAnchorEl(null);
  };

  const handleLogout = () => {
    handlePopupClose();
    logout({ returnTo: window.location.origin });
  };

  return (
    <Box className={clsx(c.root, otherProps.className)} {...otherProps}>
      <IconButton
        size='small'
        edge='end'
        aria-controls='account-popup'
        aria-haspopup='true'
        onClick={handleAccountPopupOpen}
      >
        <UserIcon className={c.icon} />
      </IconButton>
      <Popover
        id='account-popup'
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={popoverIsOpen}
        onClose={handlePopupClose}
      >
        <Box className={c.popup}>
          <Avatar src={user.picture} className={c.avatar} />
          <Typography gutterBottom>{user.email}</Typography>
          <Button
            variant='text'
            color='secondary'
            size='small'
            onClick={handleLogout}
          >
            {t('Log Out')}
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    icon: {
      color: t.palette.grey[700],
    },
    popup: {
      padding: t.spacing(4, 5, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      width: t.spacing(7),
      height: t.spacing(7),
      marginBottom: t.spacing(1.25),
    },
  }),
);

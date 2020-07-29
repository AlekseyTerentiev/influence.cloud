import React from 'react';
import { useAuth } from 'auth';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Popover,
  Box,
  Avatar,
  Typography,
  Button,
} from '@material-ui/core';
import { ReactComponent as UserIcon } from 'img/user.svg';

export interface UserProps extends React.HTMLAttributes<HTMLDivElement> {}

export const User: React.FC<UserProps> = ({ ...other }) => {
  const { t } = useTranslation();
  const c = useStyles();

  const { user, logout } = useAuth();

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const popoverIsOpen = Boolean(popoverAnchorEl);
  function handleAccountPopupOpen(event: React.MouseEvent<HTMLElement>) {
    setPopoverAnchorEl(event.currentTarget);
  }
  function handlePopupClose() {
    setPopoverAnchorEl(null);
  }

  function handleLogout() {
    logout();
    handlePopupClose();
  }

  return (
    <div className={c.root} {...other}>
      <IconButton
        className={c.icon}
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
        <Box
          px={5}
          pt={4}
          pb={3}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Avatar
            src={user.picture}
            style={{ marginBottom: 10, width: 56, height: 56 }}
          />
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
    </div>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    icon: {
      color: theme.palette.grey[600],
    },
  }),
);

import React, { FC, useState, useEffect } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { Modal } from 'components/common/modal';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

declare global {
  interface Window {
    OneSignal: any;
  }
}

export interface PushNotyPromptProps {
  userId: string;
}

export const PushNotyPrompt: FC<PushNotyPromptProps> = ({ userId }) => {
  const c = useStyles();

  const [open, setOpen] = useState(
    'Notification' in window && window.Notification.permission === 'default',
  );

  const handleSubscribeClick = () => {
    window.OneSignal.registerForPushNotifications();
    setOpen(false);
  };

  useEffect(() => {
    window.OneSignal = [
      () => {
        window.OneSignal.init({
          allowLocalhostAsSecureOrigin: true,
          appId: process.env.REACT_APP_ONESIGNAL_APP_ID,
          welcomeNotification: {
            disable: true,
          },
        });
      },
      () => {
        window.OneSignal.setExternalUserId(userId);
      },
    ];

    const oneSignalSdkScript = document.createElement('script');
    oneSignalSdkScript.setAttribute(
      'src',
      'https://cdn.onesignal.com/sdks/OneSignalSDK.js',
    );
    document.head.appendChild(oneSignalSdkScript);
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      fullWidthOnMobile={false}
      fullWidth={false}
    >
      <Box className={c.root}>
        <FontAwesomeIcon icon={faBell} className={c.icon} />

        <Typography className={c.text}>
          Turn on notifications to keep <br /> abreast of important events
        </Typography>

        <Button
          onClick={handleSubscribeClick}
          fullWidth
          size='large'
          color='primary'
          variant='contained'
        >
          Turn On Notifications
        </Button>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      padding: t.spacing(2, 2, 0.5),
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    icon: {
      display: 'block',
      color: t.palette.grey[400],
      margin: 'auto',
      fontSize: '1.8rem',
    },
    text: {
      fontSize: 17,
      margin: t.spacing(2, 0, 1.5),
    },
  }),
);

import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

const isSafari =
  navigator.userAgent.indexOf('Safari') != -1 &&
  navigator.userAgent.indexOf('Chrome') == -1;

export interface PushNotyPromptProps {
  userId: string;
}

export const PushNotyPrompt: FC<PushNotyPromptProps> = ({ userId }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const [open, setOpen] = useState(
    window.location.hostname !== 'localhost' &&
      'Notification' in window &&
      window.Notification.permission === 'default' &&
      !isSafari,
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

        <Typography variant='h6' className={c.title}>
          {t('For stable work of our app we reccomend turn on notifications')} <br />
        </Typography>

        <Typography className={c.text}>
          {t(
            'Get instant notifications about new tasks, requests, confirmations etc.',
          )}
        </Typography>

        <Button
          onClick={handleSubscribeClick}
          fullWidth
          size='large'
          color='primary'
          variant='contained'
        >
          {t('Turn On Notifications')}
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
    title: {
      fontSize: 17,
      marginTop: t.spacing(2),
    },
    text: {
      fontSize: 16,
      margin: t.spacing(1, 0, 1.5),
      color: t.palette.text.secondary,
    },
  }),
);

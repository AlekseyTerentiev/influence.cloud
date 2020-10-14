import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Hidden,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useUpsertInstagramAccount } from 'gql/instagram-accounts';
import { Error } from 'components/common/error';
import { Modal } from 'components/common/modal';
import InstagramLogoImg from 'img/instagram_logo.png';
import { VerifyAccount } from './verify-account';
import { UpdateAccount } from './update-account';

function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export interface AddAccountProps {}

export const AddAccount: FC<AddAccountProps> = () => {
  const { t } = useTranslation();
  const c = useStyles();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [verified, setVerified] = useState(false);

  const [exampleCostInt, setExampleCostInt] = useState(7);
  const [exampleCostDecimal, setExampleCostDecimal] = useState(49);

  const [
    upsertInstagramAccount,
    { loading: upserting, data: upsertedData, error: upsertingError },
  ] = useUpsertInstagramAccount();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleComplete = () => {
    (window as any).gtag('event', 'account-instagram-add', {
      username,
    });
    setOpen(false);
  };
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim());
  };
  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    upsertInstagramAccount({
      variables: {
        username: username.startsWith('@') ? username.substr(1) : username,
      },
    });
  };

  const costRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!costRef?.current) {
      return;
    }
    costRef.current.addEventListener('animationiteration', () => {
      setExampleCostInt(getRandom(5, 30));
      setExampleCostDecimal(getRandom(1, 99));
    });
  }, [costRef]);

  return (
    <>
      <div className={c.root}>
        <div className={c.backdrop} />
        <Hidden mdUp>
          <Typography variant='h6'>Earnings</Typography>
        </Hidden>

        <div className={c.banner}>
          <Box style={{ flex: 1.75, justifyContent: 'flex-end' }}>
            <span className={c.cost} ref={costRef}>
              <span>$</span>
              <span className={c.costInt}>{exampleCostInt}</span>
              <span className={c.costDecimal}>.{exampleCostDecimal}</span>
            </span>
          </Box>

          <Typography className={c.title}>Add your Instagram</Typography>

          <Typography className={c.subtitle}>
            Find out how much you can earn for <br /> promo story and see all
            available tasks.
          </Typography>

          <Box style={{ flex: 1.75 }}>
            <Button
              size='large'
              fullWidth
              onClick={handleOpen}
              className={c.actionButton}
            >
              {t('Add')} Instagram
            </Button>

            <Typography className={c.hint}>no password required</Typography>
          </Box>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        className={c.modal}
        maxWidth={false}
        fullWidth={false}
      >
        <img
          src={InstagramLogoImg}
          className={c.instagramLogo}
          alt='Instagram logo'
        />

        <Box pt={3} pb={4.5}>
          <Divider />
        </Box>

        {!upsertedData && (
          <form onSubmit={handleAddSubmit}>
            <Typography style={{ marginBottom: 20 }}>
              {t('Enter your Instagram account name')}
            </Typography>

            <TextField
              id='instagram-username'
              name='instagram-username'
              label={t('Instagram username')}
              // autoFocus
              value={username}
              onChange={handleChangeUsername}
              fullWidth
              variant='outlined'
            />

            <Button
              type='submit'
              color='primary'
              variant='contained'
              size='large'
              fullWidth
              disabled={!username || upserting}
              style={{ marginTop: 12, minWidth: 200 }}
            >
              {upserting ? (
                <CircularProgress style={{ width: 28, height: 28 }} />
              ) : (
                t('Add') + ' ' + t('Account')
              )}
            </Button>

            {upsertingError && <Error error={upsertingError} />}

            <Box pt={5} pb={3}>
              <Divider />
            </Box>

            <Typography variant='body2'>
              {t(
                'We do not ask for a password for your account and you do not risk your data',
              )}
            </Typography>
          </form>
        )}

        {upsertedData && !verified && (
          <VerifyAccount
            username={upsertedData.upsertInstagramAccount.username}
            emojis={upsertedData.upsertInstagramAccount.emojis}
            onComplete={() => setVerified(true)}
          />
        )}

        {upsertedData && verified && (
          <UpdateAccount
            id={upsertedData.upsertInstagramAccount.id}
            onComplete={handleComplete}
          />
        )}
      </Modal>
    </>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    backdrop: {
      position: 'absolute',
      background: 'rgba(244, 245, 248, 1)',
      width: '100%',
      height: '28vh',
      zIndex: -1,
      top: 0,
      left: 0,
    },
    banner: {
      width: '100%',
      flex: 1,
      marginTop: t.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: t.spacing(3),
      background: t.palette.primary.main,
      borderRadius: t.shape.borderRadius * 3,
      color: 'white',
      textAlign: 'center',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      flexDirection: 'column',
      [t.breakpoints.up('sm')]: {
        flex: 'none',
        minHeight: 450,
      },
      [t.breakpoints.up('md')]: {
        maxWidth: 500,
      },
      '& > *': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        [t.breakpoints.up('sm')]: {
          width: 256,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    cost: {
      fontSize: 24,
      fontWeight: 500,
      justifyContent: 'flex-end',
      animation: '$blink 5s infinite',
    },
    costInt: {
      fontSize: 64,
      lineHeight: '74px',
    },
    costDecimal: {
      fontSize: 14,
      verticalAlign: 'top',
    },
    '@keyframes blink': {
      '0%': {
        opacity: 0,
      },
      '20%': {
        opacity: 1,
      },
      '80%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0,
      },
    },
    title: {
      fontSize: t.typography.h5.fontSize,
      fontWeight: 500,
    },
    subtitle: {
      fontSize: t.typography.body2.fontSize,
      fontWeight: 500,
    },
    actionButton: {
      color: t.palette.primary.main,
      fontSize: t.typography.body1.fontSize,
      padding: t.spacing(1.1, 2.5),
      background: 'white',
      border: 'none',
      fontWeight: 600,
      '&:hover': {
        color: t.palette.primary.main,
        background: '#ddd',
      },
    },
    hint: {
      fontSize: t.typography.body2.fontSize,
      marginTop: '4vh',
    },
    modal: {
      textAlign: 'center',
      [t.breakpoints.up('sm')]: {
        minWidth: 416,
      },
    },
    instagramLogo: {
      marginTop: t.spacing(1),
      width: 117,
      height: 41,
    },
  }),
);

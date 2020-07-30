import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { useVerifyInstagramAccount } from 'gql/instagram-accounts';
import CopyToClipboard from 'react-copy-to-clipboard';
import copyIcon from 'img/copy.svg';
import { Error } from 'components/error';

export interface VerifyAccountProps {
  username: string;
  emojis: string;
  onComplete?: () => void;
}

export const VerifyAccount: FC<VerifyAccountProps> = ({
  username,
  emojis,
  onComplete,
}) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [openCopiedAlert, setOpenCopiedAlert] = useState(false);

  const [
    verifyInstagramAccount,
    { loading: verifying, error: verifyingError },
  ] = useVerifyInstagramAccount();

  async function handleVerify() {
    await verifyInstagramAccount({
      variables: {
        username,
        emojis,
      },
    });

    if (onComplete) {
      onComplete();
    }
  }

  return (
    <>
      <Typography>
        Добавьте следующие 4 символа в поле "о себе" аккаунта или оставьте в
        комментарии под последним постом и нажмите кнопку "{t('Verify')}"
      </Typography>

      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        mt={2.6}
        mb={0.8}
      >
        <Typography style={{ fontSize: '2.4rem', letterSpacing: 8 }}>
          {emojis}
        </Typography>

        <CopyToClipboard text={emojis} onCopy={() => setOpenCopiedAlert(true)}>
          <IconButton
            data-clipboard-text={emojis}
            aria-label={t('Copy emojis')}
            edge='end'
            style={{ marginLeft: 6 }}
          >
            <img className={c.copyIcon} src={copyIcon} />
          </IconButton>
        </CopyToClipboard>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openCopiedAlert}
          autoHideDuration={2000}
          onClose={() => setOpenCopiedAlert(false)}
        >
          <SnackbarContent className={c.copiedAlert} message={t('Emojis copied')} />
        </Snackbar>
      </Box>

      <Button
        onClick={handleVerify}
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        disabled={verifying}
      >
        {verifying ? (
          <CircularProgress style={{ width: 24, height: 24 }} />
        ) : (
          t('Verify')
        )}
      </Button>

      {verifyingError && <Error error={verifyingError} />}
    </>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    copyIcon: {
      width: '0.85em',
      height: '0.85em',
    },
    copiedAlert: {
      backgroundColor: theme.palette.info.dark,
    },
  }),
);

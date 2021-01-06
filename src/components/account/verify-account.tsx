import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  // makeStyles,
  // Theme,
  // createStyles,
  Box,
  // IconButton,
  Typography,
  Button,
  CircularProgress,
  // Snackbar,
  // SnackbarContent,
} from '@material-ui/core';
import { useVerifyInstagramAccount } from 'gql/instagram-accounts';
import CopyToClipboard from 'react-copy-to-clipboard';
// import copyIcon from 'img/copy.svg';
// import { ReactComponent as CopyIcon } from 'img/copy.svg';
import { Error } from 'components/common/error';

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
  // const c = useStyles();

  const [emojisCopied, setEmojisCopied] = useState(false);

  const [
    verifyInstagramAccount,
    { loading: verifying, error: verifyingError },
  ] = useVerifyInstagramAccount();

  const handleEmojisCopy = () => {
    setEmojisCopied(true);
  };

  const handleVerify = async () => {
    try {
      await verifyInstagramAccount({
        variables: {
          username,
          emojis,
        },
      });

      if (onComplete) {
        onComplete();
      }
    } catch (e) {
      (window as any).gtag('event', `account_instagram_verify_fail`);
      (window as any).fbq('trackCustom', 'account_instagram_verify_fail', {
        error: e.message || e,
      });
    }
  };

  return (
    <>
      <Typography>
        {t(
          'Leave the following 4 characters in comment under the last post of your account',
        )}
      </Typography>

      <Box display='flex' alignItems='center' justifyContent='center' mt={2} mb={1}>
        <Typography style={{ fontSize: '2.4rem', letterSpacing: 10 }}>
          {emojis}
        </Typography>
      </Box>

      <CopyToClipboard text={emojis} onCopy={handleEmojisCopy}>
        <Button
          href={`https://www.instagram.com/${username}/`}
          target='_blank'
          data-clipboard-text={emojis}
          aria-label={t('Copy emojis')}
          color='primary'
          variant='outlined'
          fullWidth
          disabled={verifying}
          style={{ paddingTop: 8, paddingBottom: 7 }}
        >
          {t('Copy and open account')}
        </Button>
      </CopyToClipboard>

      {emojisCopied && (
        <Button
          onClick={handleVerify}
          color='primary'
          variant='contained'
          size='large'
          fullWidth
          disabled={verifying}
          style={{ marginTop: 8 }}
        >
          {verifying ? (
            <CircularProgress style={{ width: 28, height: 28 }} />
          ) : (
            t('Verify')
          )}
        </Button>
      )}

      <Typography variant='body2' color='textSecondary' style={{ marginTop: 12 }}>
        {t('After verify you may remove this emojis')}
      </Typography>

      {verifyingError && <Error error={verifyingError} />}
    </>
  );
};

// export const useStyles = makeStyles((t: Theme) =>
//   createStyles({
//     copyIcon: {
//       width: '0.85em',
//       height: '0.85em',
//     },
//     copiedAlert: {
//       backgroundColor: t.palette.info.dark,
//     },
//   }),
// );

import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetMe_me_accounts } from 'gql/types/GetMe';
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { Modal } from 'components/common/modal';
import { AccountStatsForm } from 'components/account/account-stats-form';
import clsx from 'clsx';

export interface AccountStatsBannerProps {
  account: GetMe_me_accounts;
}

export const AccountStatsBanner: FC<AccountStatsBannerProps> = ({ account }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const [statsFormOpen, setStatsFormOpen] = useState(false);
  const handleStatsFormOpen = () => setStatsFormOpen(true);
  const handleStatsFormClose = () => setStatsFormOpen(false);

  const accountEmptyStats =
    // account.statsMediaLinksUrls.length === 0 ||
    account.impressions === null ||
    account.impressionsStory === null ||
    account.profileVisits === null ||
    account.expectedStoryCost === null;

  return (
    <>
      {accountEmptyStats && (
        <Box className={clsx(c.root, c.needUpload)}>
          <Container>
            <Typography style={{ letterSpacing: -0.3 }}>
              {t('To accept this type of task')} <br />
              {t('you need to upload your account statistics')}
            </Typography>
            <Box mt={1.25} />
            <Button
              onClick={handleStatsFormOpen}
              color='primary'
              variant='contained'
              fullWidth
              style={{ maxWidth: 318 }}
            >
              {t('Upload Statistics')}
            </Button>
          </Container>
        </Box>
      )}

      {!accountEmptyStats && !account.statisticDataVerified && (
        <Box className={clsx(c.root, c.verifying)}>
          <Container>
            <Typography>{t('Your statistics in review')}</Typography>
            <Box mt={0.5} />
            <Typography color='textSecondary'>
              {t(
                'You will receive confirmation email soon and will be able to take tasks of this type',
              )}
            </Typography>
          </Container>
        </Box>
      )}

      <Modal open={statsFormOpen} onClose={handleStatsFormClose}>
        <AccountStatsForm account={account} onSubmit={handleStatsFormClose} />
      </Modal>
    </>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      paddingTop: t.spacing(2),
      paddingBottom: t.spacing(1.5),
      marginBottom: t.spacing(2),
    },
    needUpload: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: 'rgba(229, 243, 255, 1)',
      paddingBottom: t.spacing(2.25),
    },
    verifying: {
      background: 'rgba(227, 253, 231, 1)',
    },
  }),
);

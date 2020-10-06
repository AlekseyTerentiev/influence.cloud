import React, { FC, useState } from 'react';
import { GetMe_me_accounts } from 'gql/types/GetMe';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Box,
  Button,
  Typography,
  Hidden,
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
    account?.statsMediaLinksUrls.length === 0 ||
    account?.impressions === null ||
    account?.impressionsStory === null ||
    account?.profileVisits === null ||
    account?.expectedStoryCost === null;

  return (
    <>
      {accountEmptyStats && (
        <Box className={clsx(c.root, c.needUpload)}>
          <Container>
            <Typography>
              To accept this type of task, you need{' '}
              <Hidden smDown>
                <br />
              </Hidden>
              to upload your account statistics
            </Typography>
            <Box mt={1} />
            <Button
              onClick={handleStatsFormOpen}
              color='primary'
              variant='contained'
            >
              Upload Statistics
            </Button>
          </Container>
        </Box>
      )}

      {!accountEmptyStats && !account.statisticDataVerified && (
        <Box className={clsx(c.root, c.verifying)}>
          <Container>
            <Typography>Your statistics in review</Typography>
            <Box mt={0.5} />
            <Typography color='textSecondary'>
              You will receive confirmation email soon and will be able to get this
              type tasks
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
      paddingTop: t.spacing(1.5),
      paddingBottom: t.spacing(1.5),
      marginBottom: t.spacing(2),
    },
    needUpload: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: 'rgba(229, 243, 255, 1)',
      paddingBottom: t.spacing(2),
    },
    verifying: {
      background: 'rgba(227, 253, 231, 1)',
    },
  }),
);

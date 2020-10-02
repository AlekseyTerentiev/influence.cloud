import React, { FC, useState } from 'react';
import { GetMe_me_accounts } from 'gql/types/GetMe';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Theme, Button } from '@material-ui/core';
import { Modal } from 'components/common/modal';
import { AccountStatsForm } from 'components/account/account-stats-form';

export interface AccountStatsBannerProps {
  account: GetMe_me_accounts;
}

export const AccountStatsBanner: FC<AccountStatsBannerProps> = ({ account }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const [statsFormOpen, setStatsFormOpen] = useState(false);
  const handleStatsFormOpen = () => setStatsFormOpen(true);
  const handleStatsFormClose = () => setStatsFormOpen(false);

  return (
    <>
      <Button
        variant='contained'
        fullWidth
        className={c.root}
        onClick={handleStatsFormOpen}
      >
        {t(
          'Upload your account statistics to execute "Blogger story ads" type of tasks',
        )}
      </Button>

      <Modal open={statsFormOpen} onClose={handleStatsFormClose}>
        <AccountStatsForm account={account} />
      </Modal>
    </>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      marginTop: t.spacing(1),
      background: t.palette.info.light,
    },
  }),
);

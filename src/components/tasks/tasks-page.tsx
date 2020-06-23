import React from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Avatar,
} from '@material-ui/core';
import { AddAccount } from 'components/account/add-account';
import { useUserSocialAccounts } from 'gql';

interface TasksPageProps extends RouteComponentProps {}

export const TasksPage: React.FC<TasksPageProps> = () => {
  const c = useStyles();

  const {
    userSocialAccounts,
    loading: loadingSocialAccounts,
  } = useUserSocialAccounts('me');

  if (loadingSocialAccounts) {
    return null;
  }

  const socialAccount = userSocialAccounts && userSocialAccounts[0];
  const instagramAccount = socialAccount?.instagramAccount;

  if (!socialAccount?.verified || !instagramAccount?.accountType) {
    return (
      <Box className={c.addAccountScreen}>
        <Typography>
          Для начала выполнения заданий <br />
          Вам необходимо добавить профайл Instagram
        </Typography>
        <Box mt={2}>
          <AddAccount />
        </Box>
      </Box>
    );
  }

  return (
    <Box p={4} textAlign='center'>
      <Avatar
        src={instagramAccount.profilePic}
        style={{ margin: '0 auto 6px', width: 50, height: 50 }}
      />
      <Typography style={{ fontSize: '1.2rem' }}>
        @{instagramAccount.username}
      </Typography>
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    addAccountScreen: {
      textAlign: 'center',
      paddingTop: '26vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

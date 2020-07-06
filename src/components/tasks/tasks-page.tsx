import React, { FC } from 'react';
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
import { useMe } from 'gql';
import { Loading } from 'components/loading';

export interface TasksPageProps extends RouteComponentProps {}

export const TasksPage: FC<TasksPageProps> = () => {
  const c = useStyles();

  const { me, loading: loadingMe } = useMe();
  const accounts = me?.accounts || [];
  const myInstagramAccount = accounts[0]?.instagramAccount;

  if (loadingMe) {
    return <Loading />;
  }

  if (!myInstagramAccount || !myInstagramAccount.accountType) {
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
        src={myInstagramAccount.profilePic || undefined}
        style={{ margin: '0 auto 6px', width: 50, height: 50 }}
      />
      <Typography style={{ fontSize: '1.2rem' }}>
        @{myInstagramAccount.username}
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

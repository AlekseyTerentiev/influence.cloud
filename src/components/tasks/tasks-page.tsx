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
import { useMe } from 'gql';
import { Loading } from 'components/loading';
import { AddAccount } from 'components/account/add-account';
import { AvailableTasks } from 'components/tasks/available-tasks';

export interface TasksPageProps extends RouteComponentProps {}

export const TasksPage: FC<TasksPageProps> = () => {
  const c = useStyles();

  const { me, loading: loadingMe } = useMe();
  const account = me?.accounts[0];
  const instagramAccount = account?.instagramAccount;

  if (loadingMe) {
    return <Loading />;
  }

  if (!instagramAccount || !instagramAccount.accountType) {
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
    <Box className={c.root}>
      {/* <Box textAlign='center' mb={3}>
        <Avatar
          src={instagramAccount.profilePic || undefined}
          style={{ margin: '0 auto 6px', width: 50, height: 50 }}
        />
        <Typography style={{ fontSize: '1.2rem' }}>
          @{instagramAccount.username}
        </Typography>
      </Box> */}

      {account && (
        <Box>
          <AvailableTasks accountId={account.id} />
        </Box>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAccountScreen: {
      textAlign: 'center',
      paddingTop: '26vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: theme.spacing(5),
      paddingTop: theme.spacing(4.5),
      paddingBottom: theme.spacing(4.5),
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(8),
        paddingTop: theme.spacing(7.5),
        paddingBottom: theme.spacing(7.5),
      },
      [theme.breakpoints.up('md')]: {
        gridGap: theme.spacing(10),
        paddingTop: theme.spacing(8.5),
        paddingBottom: theme.spacing(8.5),
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'minmax(auto, 480px) minmax(auto, auto)',
        gridGap: '9vw',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(16),
      },
    },
  }),
);

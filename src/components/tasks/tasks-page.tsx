import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { makeStyles, createStyles, Theme, Box, Typography } from '@material-ui/core';
import { useMe } from 'gql/user';
import { Loading } from 'components/loading';
import { AddAccount } from 'components/account/add-account';
import { AvailableTasks } from 'components/tasks/available-tasks';
import { AccountTasks } from 'components/tasks/account-tasks';

export interface TasksPageProps extends RouteComponentProps {
  children?: React.ReactNode;
}

export const TasksPage: FC<TasksPageProps> = ({ children }) => {
  const c = useStyles();

  const { me, loading: loadingMe } = useMe();
  const account = me?.accounts[0];
  const instagramAccount = account?.instagramAccount;

  if (loadingMe) {
    return <Loading />;
  }

  if (!account || !instagramAccount || !instagramAccount.accountType) {
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
      <AccountTasks accountId={account.id} />
      <AvailableTasks accountId={account.id} />
      {children}
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
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(7),
        paddingTop: theme.spacing(6.5),
        paddingBottom: theme.spacing(6.5),
      },
      [theme.breakpoints.up('md')]: {
        gridGap: theme.spacing(9),
        paddingTop: theme.spacing(7.5),
        paddingBottom: theme.spacing(7.5),
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '1fr 1fr',
        gridGap: '9vw',
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(9),
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(14),
      },
    },
  }),
);

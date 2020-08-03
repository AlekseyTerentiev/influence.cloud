import React, { FC, useState, ChangeEvent } from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { useMe } from 'gql/user';
import { Loading } from 'components/loading';
import { AddAccount } from 'components/account/add-account';
import { AvailableTasks } from 'components/tasks/available-tasks';
import { AccountTasks } from 'components/tasks/account-tasks';

export interface TasksPageProps extends RouteComponentProps {
  children?: React.ReactNode;
}

export enum ScreenType {
  availableTasks = 'availableTasks',
  accountTasks = 'accountTasks',
}

export const TasksPage: FC<TasksPageProps> = ({ children }) => {
  const c = useStyles();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const { me, loading: loadingMe } = useMe();
  const account = me?.accounts[0];
  const instagramAccount = account?.instagramAccount;

  const [screen, setScreen] = useState<ScreenType>(ScreenType.availableTasks);
  const handleScreenChange = (e: ChangeEvent<{}>, screen: ScreenType) => {
    setScreen(screen);
  };

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

  if (mdUp) {
    return (
      <Box className={c.rootDesktop}>
        <AccountTasks accountId={account.id} withHeader />
        <AvailableTasks accountId={account.id} withHeader />
        {children}
      </Box>
    );
  }

  return (
    <Box className={c.root}>
      <Box className={c.account}>
        <Avatar
          src={instagramAccount.profilePic || undefined}
          className={c.avatar}
        />
        <Typography>{instagramAccount.username}</Typography>
      </Box>
      <Tabs
        value={screen}
        onChange={handleScreenChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        className={c.tabs}
      >
        <Tab label='Доступные задания' value={ScreenType.availableTasks} />
        <Tab label='Принятые задания' value={ScreenType.accountTasks} />
      </Tabs>

      {screen === ScreenType.availableTasks && (
        <AvailableTasks accountId={account.id} />
      )}
      {screen === ScreenType.accountTasks && <AccountTasks accountId={account.id} />}

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
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    account: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    avatar: {
      width: 50,
      height: 50,
      marginBottom: theme.spacing(0.75),
    },
    tabs: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(1.5),
      borderBottom: '1px solid' + theme.palette.divider,
    },
    rootDesktop: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
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

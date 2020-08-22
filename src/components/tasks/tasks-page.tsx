import React, { FC, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
      <Box className={c.addAccountBlock}>
        <Typography>
          {t('To start completing tasks')}
          <br />
          {t('you need to add an Instagram profile')}
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
        <AvailableTasks accountId={account.id} withHeader />
        <AccountTasks accountId={account.id} withHeader />
        {children}
      </Box>
    );
  }

  return (
    <Box className={c.root}>
      <Box>
        <Box className={c.account}>
          <Box mb={1}>
            <Typography className={c.label} variant='caption'>
              {t('acc_rating')}
            </Typography>
            <Typography>{account.rating}</Typography>
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Avatar
              src={instagramAccount.profilePic || undefined}
              className={c.avatar}
            />
            <Typography className={c.username}>
              {instagramAccount.username}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography className={c.label} variant='caption'>
              {t('Level')}
            </Typography>
            <Typography variant='body2'>{t('Newbie')}</Typography>
          </Box>
        </Box>
        <Tabs
          value={screen}
          onChange={handleScreenChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          className={c.tabs}
        >
          <Tab label={t('Available tasks')} value={ScreenType.availableTasks} />
          <Tab label={t('Accepted tasks')} value={ScreenType.accountTasks} />
        </Tabs>
      </Box>

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
    addAccountBlock: {
      textAlign: 'center',
      paddingTop: '30vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
      [theme.breakpoints.only('sm')]: {
        paddingBottom: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0, -3),
      },
    },
    account: {
      paddingTop: theme.spacing(5),
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-evenly',
    },
    label: {
      color: theme.palette.text.secondary,
      textTransform: 'uppercase',
      fontSize: '0.8rem',
      letterSpacing: 1,
    },
    avatar: {
      width: 56,
      height: 56,
      marginBottom: theme.spacing(0.8),
    },
    username: {
      fontSize: '1.05rem',
    },
    tabs: {
      marginTop: theme.spacing(1.25),
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

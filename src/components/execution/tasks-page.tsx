import React, { FC, ReactNode, useState, ChangeEvent } from 'react';
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
import { Loading } from 'components/common/loading';
import { AddAccount } from 'components/account/add-account';
import { AvailableTasks } from 'components/execution/available-tasks';
import { AccountTasks } from 'components/execution/account-tasks';

export interface TasksPageProps extends RouteComponentProps {
  children?: ReactNode;
}

export enum ScreenType {
  availableTasks = 'availableTasks',
  accountTasks = 'accountTasks',
}

export const TasksPage: FC<TasksPageProps> = ({ children }) => {
  const { t } = useTranslation();
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
      <Box className={c.account}>
        <Box mb={1}>
          <Typography className={c.label} variant='caption'>
            {t('Rating')}
          </Typography>
          <Typography>{account.rating}</Typography>
        </Box>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Avatar
            src={instagramAccount.profilePic || undefined}
            className={c.avatar}
          />
          <Typography className={c.username}>{instagramAccount.username}</Typography>
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

      {screen === ScreenType.availableTasks && (
        <AvailableTasks accountId={account.id} />
      )}
      {screen === ScreenType.accountTasks && <AccountTasks accountId={account.id} />}

      {children}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    addAccountBlock: {
      textAlign: 'center',
      paddingTop: '30vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
      [t.breakpoints.only('sm')]: {
        paddingBottom: t.spacing(4),
      },
      [t.breakpoints.down('xs')]: {
        margin: t.spacing(0, -3),
      },
    },
    account: {
      paddingTop: t.spacing(5),
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-evenly',
    },
    label: {
      color: t.palette.text.secondary,
      textTransform: 'uppercase',
      fontSize: '0.8rem',
      letterSpacing: 1,
    },
    avatar: {
      width: 56,
      height: 56,
      marginBottom: t.spacing(0.8),
    },
    username: {
      fontSize: '1.05rem',
    },
    tabs: {
      marginTop: t.spacing(1.25),
      borderBottom: `1px solid ${t.palette.divider}`,
    },
    rootDesktop: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: t.spacing(5),
      paddingTop: t.spacing(4),
      paddingBottom: t.spacing(4),
      [t.breakpoints.up('sm')]: {
        gridGap: t.spacing(7),
        paddingTop: t.spacing(6.5),
        paddingBottom: t.spacing(6.5),
      },
      [t.breakpoints.up('md')]: {
        gridGap: t.spacing(9),
        paddingTop: t.spacing(7.5),
        paddingBottom: t.spacing(7.5),
      },
      [t.breakpoints.up('lg')]: {
        gridGap: '9vw',
        paddingTop: t.spacing(9),
        paddingBottom: t.spacing(9),
      },
      [t.breakpoints.up('xl')]: {
        gridGap: t.spacing(14),
      },
    },
  }),
);

import React, { FC, ReactNode, useState, ChangeEvent } from 'react';
import { useStyles } from './execution-page.s';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import {
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
import { AvailableTasks } from 'components/execution/available-tasks/available-tasks';
import { AccountTasks } from 'components/execution/account-tasks/account-tasks';
import clsx from 'clsx';

export interface ExecutionPageProps extends RouteComponentProps {
  children?: ReactNode;
}

export enum ScreenType {
  availableTasks = 'availableTasks',
  accountTasks = 'accountTasks',
}

export const ExecutionPage: FC<ExecutionPageProps> = ({ children }) => {
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
      <Box className={clsx(c.root, c.rootDesktop)}>
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

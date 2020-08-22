import React, { FC } from 'react';
import { useMe } from 'gql/user';
import { Router, Redirect, navigate } from '@reach/router';
import {
  SIGNUP_CALLBACK_ROUTE,
  SIGNUP_COMPLETE_ROUTE,
  TASKS_ROUTE,
  ACCOUNT_TASK_ROUTE,
  AVAILABLE_TASK_ROUTE,
  CREATE_TASK_ROUTE,
  CREATED_TASK_ROUTE,
  ACCOUNT_ROUTE,
  BILLING_ROUTE,
} from 'routes';
import { AppBar } from 'components/app-bar';
import { Container, Hidden, Box } from '@material-ui/core';
import { SignUpCallbackPage } from 'components/auth/signup-callback-page';
import { SignUpCompletePage } from 'components/auth/signup-complete-page';
import { TasksPage } from 'components/tasks/tasks-page';
import { CreateTaskPage } from 'components/tasks/create-task-page';
import { AccountPage } from 'components/account/account-page';
import { BillingPage } from 'components/billing/billing-page';
import { NavBot } from 'components/nav-bot';
import { Preloader } from 'components/preloader';
import { Error } from 'components/error';
import { AccountTask } from 'components/tasks/account-task';
import { AvailableTask } from 'components/tasks/available-task';
import { CreatedTask } from 'components/tasks/created-task';
import { WelcomePage } from 'components/welcome-page/welcome-page';

export const App: FC = () => {
  const { me, loading, error } = useMe();

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <Box pt='40vh'>
        <Error error={error} />
      </Box>
    );
  }

  const isNewbie = !me?.accounts.length && !me?.createdTasks.length;

  return (
    <>
      <Hidden xsDown={!!me}>
        <AppBar />
      </Hidden>
      <Container>
        {!me ? (
          <Router>
            <SignUpCallbackPage path={SIGNUP_CALLBACK_ROUTE} />
            <SignUpCompletePage path={SIGNUP_COMPLETE_ROUTE} />
            <Redirect default from='*' to={SIGNUP_COMPLETE_ROUTE} noThrow />
          </Router>
        ) : (
          <Router primary={false}>
            <Redirect default from='*' to={isNewbie ? '/' : TASKS_ROUTE} noThrow />
            {isNewbie && <WelcomePage path='/' />}
            <TasksPage path={TASKS_ROUTE}>
              <AccountTask
                path={ACCOUNT_TASK_ROUTE}
                onClose={() => navigate('../../')}
              />
              <AvailableTask
                path={AVAILABLE_TASK_ROUTE}
                onClose={() => navigate('../../')}
              />
            </TasksPage>
            <CreateTaskPage path={CREATE_TASK_ROUTE}>
              <CreatedTask
                path={CREATED_TASK_ROUTE}
                onClose={() => navigate('../')}
              />
            </CreateTaskPage>
            <AccountPage path={ACCOUNT_ROUTE} />
            <BillingPage path={BILLING_ROUTE} />
          </Router>
        )}
      </Container>
      {me && (
        <Hidden mdUp>
          <NavBot />
        </Hidden>
      )}
    </>
  );
};

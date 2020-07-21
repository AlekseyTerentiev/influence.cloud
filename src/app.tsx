import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { Router, Redirect } from '@reach/router';
import {
  SIGNUP_CALLBACK_ROUTE,
  SIGNUP_COMPLETE_ROUTE,
  TASKS_ROUTE,
  CREATE_TASK_ROUTE,
  ACCOUNT_ROUTE,
} from 'routes';
import { AppBar } from 'components/app-bar';
import { Container, Hidden, Box } from '@material-ui/core';
import { SignUpCallbackPage } from 'components/auth/signup-callback-page';
import { SignUpCompletePage } from 'components/auth/signup-complete-page';
import { TasksPage } from 'components/tasks/tasks-page';
import { CreateTaskPage } from 'components/tasks/create-task-page';
import { AccountPage } from 'components/account/account-page';
import { NavBot } from 'components/nav-bot';
import { Preloader } from 'components/preloader';
import { Error } from 'components/error';

export const App: FC = () => {
  const { t } = useTranslation();
  const { me, loading, error } = useMe();

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <Box style={{ marginTop: '40vh' }}>
        <Error error={error} />
      </Box>
    );
  }

  return (
    <>
      <AppBar />
      <Container>
        {!me ? (
          <Router>
            <SignUpCallbackPage path={SIGNUP_CALLBACK_ROUTE} />
            <SignUpCompletePage path={SIGNUP_COMPLETE_ROUTE} />
            <Redirect default from='*' to={SIGNUP_COMPLETE_ROUTE} noThrow />
          </Router>
        ) : (
          <Router>
            <Redirect default from='*' to='/' noThrow />
            <TasksPage path={TASKS_ROUTE} />
            <CreateTaskPage path={CREATE_TASK_ROUTE} />
            <AccountPage path={ACCOUNT_ROUTE} />
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

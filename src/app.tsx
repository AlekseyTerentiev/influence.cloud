import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from 'gql';
import { Router, Redirect } from '@reach/router';
import {
  SIGNUP_CALLBACK_ROUTE,
  SIGNUP_COMPLETE_ROUTE,
  TASKS_ROUTE,
  CREATE_TASK_ROUTE,
  ACCOUNT_ROUTE,
} from 'routes';
import { AppBar } from 'view/app-bar';
import { Container, Hidden, Typography } from '@material-ui/core';
import { SignUpCallbackPage } from 'view/auth/signup-callback-page';
import { SignUpCompletePage } from 'view/auth/signup-complete-page';
import { TasksPage } from 'view/tasks/tasks-page';
import { CreateTaskPage } from 'view/tasks/create-task-page';
import { AccountPage } from 'view/account/account-page';
import { NavBot } from 'view/nav-bot';
import { Preloader } from 'view/preloader';

export const App: FC = () => {
  const { t } = useTranslation();
  const { user, loading, error } = useUser('me');

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <Typography align='center' style={{ marginTop: '40vh' }}>
        {t('There was a loading error')} :( <br />
        {t('Please reload the page')}
      </Typography>
    );
  }

  return (
    <>
      <AppBar />
      <Container>
        {!user ? (
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
      {user && (
        <Hidden mdUp>
          <NavBot />
        </Hidden>
      )}
    </>
  );
};

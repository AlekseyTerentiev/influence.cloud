import React, { FC } from 'react';
import { useMe } from 'gql/user';
import { Router, Redirect } from '@reach/router';
import {
  SIGNUP_CALLBACK_ROUTE,
  SIGNUP_COMPLETE_ROUTE,
  EXECUTION_ROUTE,
  PUBLICATION_ROUTE,
  ACCOUNT_ROUTE,
  BILLING_ROUTE,
} from 'routes';
import { AppBar } from 'components/common/app-bar';
import { Container, Hidden } from '@material-ui/core';
import { SignUpCallbackPage } from 'components/auth/signup-callback-page';
import { SignUpCompletePage } from 'components/auth/signup-complete-page';
import { PublicationPage } from 'components/publication/publication-page';
import { ExecutionPage } from 'components/execution/execution-page';
import { AccountPage } from 'components/account/account-page';
import { BillingPage } from 'components/billing/billing-page';
import { NavBot } from 'components/common/nav-bot';
import { Preloader } from 'components/common/preloader';
import { Error } from 'components/common/error';

export const App: FC = () => {
  const { me, loading, error } = useMe();

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <Error error={error} pt='40vh' />;
  }

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
            <Redirect default from='*' to={PUBLICATION_ROUTE} noThrow />
            <PublicationPage path={PUBLICATION_ROUTE + '/*'} />
            <ExecutionPage path={EXECUTION_ROUTE + '/*'} />
            <AccountPage path={ACCOUNT_ROUTE} />
            <BillingPage path={BILLING_ROUTE} />
          </Router>
        )}
      </Container>
      {me && (
        <Hidden smUp>
          <NavBot />
        </Hidden>
      )}
    </>
  );
};

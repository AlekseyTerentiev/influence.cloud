import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './i18n';
import './fonts/index.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { AuthProvider } from './auth';
import { ApolloProvider } from './apollo';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { App } from './app';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_API_KEY || '');

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

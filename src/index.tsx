import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './i18n';
import './fonts/index.css';
import './index.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { Auth0Provider } from '@auth0/auth0-react';
import { Auth } from './auth';
import { ApolloProvider } from './apollo-provider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { App } from './app';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_API_KEY || '');

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    redirectUri={window.location.origin}
  >
    <Auth>
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
    </Auth>
  </Auth0Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

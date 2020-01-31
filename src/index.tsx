import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './i18n'
import 'typeface-roboto-cyrillic'
import 'typeface-montserrat'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'
import { Auth0Provider } from 'auth0'
import { App } from './app'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin + '/account'}
    >
      <App />
    </Auth0Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()

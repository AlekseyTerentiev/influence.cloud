import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './i18n'
import 'fonts/index.css'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from 'theme'
import { Auth0Provider } from 'auth0'
import { StoreProvider, store } from 'store'
import { App } from './app'

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    redirect_uri={window.location.origin}
  >
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()

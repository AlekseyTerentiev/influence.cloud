import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './i18n'
import 'typeface-roboto-cyrillic'
import 'typeface-montserrat'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { App } from './app'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()

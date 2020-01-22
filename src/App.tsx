import React from 'react'
import { AppBar } from 'view/app-bar'
import { Router } from '@reach/router'
import { Tasks } from 'view/tasks'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { NavBot } from 'view/nav-bot'

export const App: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <AppBar />
      <Router>
        <Tasks path='/' default />
      </Router>
      {smDown && <NavBot />}
    </>
  )
}

export default App

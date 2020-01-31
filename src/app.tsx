import React, { useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/core/styles/useTheme'
import { AppBar } from 'view/app-bar'
import { Router } from '@reach/router'
import Container from '@material-ui/core/Container'
import { Tasks } from 'view/tasks'
import { Account } from 'view/account'
import { NavBot } from 'view/nav-bot'
import { useAuth0 } from 'auth0'
import { Loader } from 'loader'

export const App: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      loginWithRedirect({})
    }
  }, [loading, isAuthenticated])

  if (loading) {
    return <Loader />
  } else if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <AppBar />
      <Container>
        <Router>
          <Tasks path='/' default />
          <Account path='/account' />
        </Router>
      </Container>
      {smDown && <NavBot />}
    </>
  )
}

import React, { useEffect } from 'react'
import { useAuth0 } from 'auth0'
import { Loader } from 'loader'
import { AppBar } from 'view/app-bar'
import Container from '@material-ui/core/Container'
import { Router } from '@reach/router'
import { Tasks } from 'view/tasks'
import { Account } from 'view/account'
import Hidden from '@material-ui/core/Hidden'
import { NavBot } from 'view/nav-bot'

export const App: React.FC = () => {
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
      <Hidden mdUp>
        <NavBot />
      </Hidden>
    </>
  )
}

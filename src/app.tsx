import React, { useEffect } from 'react'
import { useAuth0 } from 'auth0'
import { useStoreActions } from 'store'
import { Preloader } from 'view/preloader'
import { AppBar } from 'view/app-bar'
import { Container, Hidden } from '@material-ui/core'
import { Router } from '@reach/router'
import { Tasks } from 'view/tasks'
import { Account } from 'view/account'
import { NavBot } from 'view/nav-bot'

export const App = () => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()
  const { fetchProfile } = useStoreActions(actions => actions.profile)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [loading, isAuthenticated, loginWithRedirect])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile()
    }
  }, [isAuthenticated, fetchProfile])

  if (loading || !isAuthenticated) {
    return <Preloader />
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

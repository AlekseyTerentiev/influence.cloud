import React, { useEffect } from 'react'
import { useAuth0 } from 'auth0'
import { useStoreActions } from 'store'
import { Preloader } from 'view/preloader'
import { AppBar } from 'view/app-bar'
import { Container, Hidden } from '@material-ui/core'
import { Router } from '@reach/router'
import { ExecutionPage } from 'view/execution/execution-page'
import { AssignmentsPage } from 'view/assignments/assignments-page'
import { AccountPage } from 'view/account-page'
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
          <ExecutionPage path='/' default />
          <AssignmentsPage path='/assignments' />
          <AccountPage path='/account' />
        </Router>
      </Container>
      <Hidden mdUp>
        <NavBot />
      </Hidden>
    </>
  )
}

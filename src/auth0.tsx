import React, { FC, useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import { navigate } from '@reach/router'

export interface User {
  name: string
  nickname: string
  picture: string
  email: string
  email_verified: boolean
}

export const Auth0Context = React.createContext<{
  isAuthenticated?: boolean
  user?: User | null
  loading?: boolean
  popupOpen?: boolean
  loginWithPopup?: () => Promise<void>
  loginWithRedirect?: () => Promise<void>
  getTokenSilently?: () => Promise<any>
  logout?: () => Promise<void>
}>({})

export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider: FC<{
  domain: string
  client_id: string
  audience: string
  redirect_uri?: string
  children: React.ReactNode
}> = ({ domain, client_id, audience, redirect_uri = window.location.origin, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [auth0, setAuth0] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const init = async () => {
      const auth0 = await createAuth0Client({ domain, client_id, audience, redirect_uri })
      setAuth0(auth0)

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0.handleRedirectCallback()
        navigate(appState?.targetUrl || window.location.pathname)
      }

      const isAuthenticated = await auth0.isAuthenticated()
      setIsAuthenticated(isAuthenticated)
      if (isAuthenticated) {
        const user = await auth0.getUser()
        setUser(user)
      }

      setLoading(false)
    }

    init()
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        loginWithRedirect: (...p: any[]) => auth0?.loginWithRedirect(...p),
        getTokenSilently: (...p: any[]) => auth0?.getTokenSilently(...p),
        logout: (...p: any[]) => auth0?.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}

import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import { navigate } from '@reach/router';
import { Preloader } from 'view/preloader';
import { Router } from '@reach/router';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from 'routes';
import { AuthPage } from 'view/auth/auth-page';

const AUTH0_CONFIG = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  redirect_uri: window.location.origin,
}

export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0, setAuth0] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const auth0Client = await createAuth0Client(AUTH0_CONFIG);
      setAuth0(auth0Client);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0Client.handleRedirectCallback();
        navigate(appState?.targetUrl || window.location.pathname);
      }

      const isAuthenticated = await auth0Client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        const user = await auth0Client.getUser();
        setUser(user);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        loginWithRedirect: (...p) => auth0.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0.getTokenSilently(...p),
        logout: (...p) => auth0.logout(...p),
      }}
    >
      {isAuthenticated ? (
        children
      ) : (
        <Router>
          <AuthPage path={LOGIN_ROUTE} default />
          <AuthPage path={SIGNUP_ROUTE} signUp />
        </Router>
      )}
    </AuthContext.Provider>
  );
};

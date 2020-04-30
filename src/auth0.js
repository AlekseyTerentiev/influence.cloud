import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import { navigate } from '@reach/router';

export const Auth0Context = React.createContext();

export const useAuth0 = () => useContext(Auth0Context);

export let auth0Client;

export const Auth0Provider = ({ children, ...initOptions }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0, setAuth0] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      auth0Client = await createAuth0Client(initOptions);
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

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        loginWithRedirect: (...p) => auth0.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0.getTokenSilently(...p),
        logout: (...p) => auth0.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

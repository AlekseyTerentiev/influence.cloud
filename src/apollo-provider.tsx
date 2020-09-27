import React, { FC, ReactNode, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider as ReactApolloProvider } from '@apollo/client';
import { createApolloClient } from 'apollo-client';

export interface ApolloProviderProps {
  children?: ReactNode;
}

export const ApolloProvider: FC<ApolloProviderProps> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [client, setClient] = useState<any>();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      console.log(token);
      localStorage.setItem('token', token);
      setClient(createApolloClient(token));
    });
  }, [getAccessTokenSilently]);

  return client ? (
    <ReactApolloProvider client={client}>{children}</ReactApolloProvider>
  ) : null;
};

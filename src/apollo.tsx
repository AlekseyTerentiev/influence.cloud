import React, { FC, ReactNode, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  ApolloProvider as ReactApolloProvider,
  concat,
} from '@apollo/client';

const inMemoryCache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const createApolloClient = (token: string) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return forward(operation);
  });

  return new ApolloClient({
    cache: inMemoryCache,
    link: concat(authMiddleware, httpLink),
  });
};

export interface ApolloProviderProps {
  children?: ReactNode;
}

export const ApolloProvider: FC<ApolloProviderProps> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [client, setClient] = useState<any>();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      console.log(token);
      setClient(createApolloClient(token));
    });
  }, [getAccessTokenSilently]);

  return client ? (
    <ReactApolloProvider client={client}>{children}</ReactApolloProvider>
  ) : null;
};

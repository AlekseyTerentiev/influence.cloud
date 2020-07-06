import React, { useState, useEffect } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import * as apollo from '@apollo/react-hooks';
import { useAuth } from 'auth';

export const ApolloProvider = ({ children }) => {
  const { getTokenSilently } = useAuth();
  const [client, setClient] = useState();

  useEffect(() => {
    if (!getTokenSilently) {
      return;
    }

    const init = async () => {
      const token = await getTokenSilently();
      console.log(token);
      setClient(
        new ApolloClient({
          uri: process.env.REACT_APP_GRAPHQL_URL,
          cache: new InMemoryCache(),
          request: (operation) => {
            operation.setContext((context) => ({
              headers: {
                ...context.headers,
                authorization: `Bearer ${token}`,
              },
            }));
          },
        }),
      );
    };

    init();
  }, [getTokenSilently]);

  return client ? (
    <apollo.ApolloProvider client={client}>{children}</apollo.ApolloProvider>
  ) : null;
};

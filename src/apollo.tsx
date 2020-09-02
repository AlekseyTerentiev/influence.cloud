import React, { FC, ReactNode, useState, useEffect } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import * as apollo from '@apollo/react-hooks';
import { useAuth0 } from '@auth0/auth0-react';

export interface ApolloProviderProps {
  children?: ReactNode;
}

export const ApolloProvider: FC<ApolloProviderProps> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [client, setClient] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
      setClient(
        new ApolloClient({
          uri: process.env.REACT_APP_GRAPHQL_URL,
          cache: new InMemoryCache(),
          request: (operation) => {
            operation.setContext((context: any) => ({
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
  }, [getAccessTokenSilently]);

  return client ? (
    <apollo.ApolloProvider client={client}>{children}</apollo.ApolloProvider>
  ) : null;
};

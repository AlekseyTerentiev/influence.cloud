import possibleTypes from 'gql/possible-types/generated-possible-types.json';
import { InMemoryCache, ApolloClient, ApolloLink, concat } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const inMemoryCache = new InMemoryCache({
  possibleTypes,
});

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

export const createApolloClient = (token: string) => {
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
    link: concat(authMiddleware, httpLink as any),
  });
};

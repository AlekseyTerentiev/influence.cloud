import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { ApolloError } from 'apollo-boost';

export interface ErrorProps {
  header?: string;
  error?: string | ApolloError | undefined;
  align?: 'center' | 'left';
}

export const Error: FC<ErrorProps> = ({ header, error, align = 'center' }) => {
  let errorText = null;

  if (error instanceof ApolloError) {
    const gqlError = error.graphQLErrors?.[0];
    if (gqlError) {
      const gqlErrorMessage: any = gqlError.message;
      errorText = gqlErrorMessage?.message || gqlError.message;
    } else {
      errorText = error.message;
    }
  } else if (typeof error === 'string') {
    errorText = error;
  }

  return (
    <Typography
      align={align}
      color='error'
      variant='body2'
      style={{ marginTop: 14 }}
    >
      {header}
      {header && errorText && (
        <>
          : <br />
        </>
      )}
      {errorText}
    </Typography>
  );
};

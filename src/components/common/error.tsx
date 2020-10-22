import React, { FC } from 'react';
import { BoxProps, Box, Typography } from '@material-ui/core';
import { ApolloError } from '@apollo/client';

export interface ErrorProps extends BoxProps {
  name?: string;
  error?: string | ApolloError | { message: string };
}

export const Error: FC<ErrorProps> = ({ name, error, ...otherProps }) => {
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
  } else if (error?.message) {
    errorText = error.message;
  }

  return (
    <Box textAlign='center' {...otherProps}>
      <Typography color='error' variant='body2'>
        {name}
        {name && errorText && (
          <>
            : <br />
          </>
        )}
        {errorText}
      </Typography>
    </Box>
  );
};

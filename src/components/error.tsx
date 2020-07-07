import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

export interface ErrorProps {
  header: string;
  error?: string;
}

export const Error: FC<ErrorProps> = ({ header, error }) => {
  return (
    <Typography color='error'>
      {header}
      {error && (
        <>
          : <br /> {error}
        </>
      )}
    </Typography>
  );
};

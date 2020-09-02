import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

export interface FDateProps {
  date: Date | string | number;
  withoutTime?: boolean;
}

export const FDate: FC<FDateProps> = ({ date, withoutTime = false }) => {
  let formatOptions: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  if (!withoutTime) {
    formatOptions.hour = '2-digit';
    formatOptions.minute = '2-digit';
  }

  return (
    <Typography noWrap component='span'>
      {(date instanceof Date ? date : new Date(date)).toLocaleString(
        undefined,
        formatOptions,
      )}
    </Typography>
  );
};

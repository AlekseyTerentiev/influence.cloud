import React from 'react';

export interface FDateProps {
  date: string | number | Date;
}

export function FDate({ date }: FDateProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      {
        (typeof date !== 'object' ? new Date(date) : date).toLocaleString(
          undefined,
          {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          },
        )
        // .replace(/\//g, '.')
      }
    </span>
  );
}

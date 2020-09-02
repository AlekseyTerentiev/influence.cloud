import React, { FC } from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export type CurrencyId = 'RUB' | 'USD';

export interface CurrencyProps extends TypographyProps {
  value: number | null | undefined; // In cents
  fraction?: number;
  sign?: boolean;
  currencyId?: CurrencyId;
  rubRight?: boolean;
}

export const Currency: FC<CurrencyProps> = ({
  value,
  currencyId = 'USD',
  fraction = 0,
  sign = true,
  ...otherProps
}) => (
  <Typography noWrap component='span' {...otherProps}>
    {sign && currencyId === 'USD' && '$ '}
    {value
      ? (Math.round(value) / 100).toLocaleString(undefined, {
          minimumFractionDigits: fraction,
        })
      : 0}
    {sign && currencyId === 'RUB' && ' ₽'}
  </Typography>
);

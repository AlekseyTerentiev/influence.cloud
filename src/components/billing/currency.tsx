import React, { FC, HTMLAttributes } from 'react';

export type CurrencyId = 'RUB' | 'USD';

export interface CurrencyProps extends HTMLAttributes<HTMLSpanElement> {
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
  <span style={{ whiteSpace: 'nowrap' }} {...otherProps}>
    {sign && currencyId === 'USD' && '$ '}
    {value
      ? (Math.round(value) / 100).toLocaleString(undefined, {
          minimumFractionDigits: fraction,
        })
      : 0}
    {sign && currencyId === 'RUB' && ' ₽'}
  </span>
);

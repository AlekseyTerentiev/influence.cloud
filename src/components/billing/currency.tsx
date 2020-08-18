import React from 'react';

export type CurrencyId = 'RUB' | 'USD';

export interface CurrencyProps {
  value: number | null | undefined; // In cents
  fraction?: number;
  sign?: boolean;
  currencyId?: CurrencyId;
  className?: string;
  rubRight?: boolean;
}

export function Currency({
  value,
  currencyId = 'USD',
  fraction = 0,
  sign = true,
  className,
}: CurrencyProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} className={className}>
      {sign && currencyId === 'USD' && '$ '}
      {value
        ? (Math.round(value) / 100).toLocaleString(undefined, {
            minimumFractionDigits: fraction,
          })
        : 0}
      {sign && currencyId === 'RUB' && ' ₽'}
    </span>
  );
}

import React from 'react'

export type CurrencyId = 'RUB' | 'USD'

export interface CurrencyProps {
  value: number | string
  fraction?: number
  currencyId?: CurrencyId
  className?: string
  rubRight?: boolean
}

export function Currency({
  value,
  fraction = 2,
  rubRight,
  currencyId = 'RUB',
  className,
}: CurrencyProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} className={className}>
      {currencyId === 'USD' && '$ '}
      {!rubRight && currencyId === 'RUB' && '₽ '}
      {Number(value).toLocaleString(undefined, { minimumFractionDigits: fraction })}
      {rubRight && currencyId === 'RUB' && '₽'}
    </span>
  )
}

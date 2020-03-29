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
  currencyId = 'RUB',
  fraction = 0,
  className,
}: CurrencyProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} className={className}>
      {currencyId === 'USD' && '$ '}
      {Number(value).toLocaleString(undefined, { minimumFractionDigits: fraction })}
      {currencyId === 'RUB' && ' ₽'}
    </span>
  )
}

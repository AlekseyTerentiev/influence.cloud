import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { Box, Typography } from '@material-ui/core';
import { Currency } from 'components/billing/currency';
import { BalanceRefill } from 'components/billing/balance-refill';

export const RefillBalance: FC = () => {
  const { t } = useTranslation();

  const { me } = useMe();

  return (
    <>
      <Box mb={1}>
        <Typography display='inline'>{t('Your balance')}:</Typography>{' '}
        <Typography display='inline' variant='h6' color='primary'>
          <Currency value={me?.balance.balance} />
        </Typography>
      </Box>

      <BalanceRefill />
    </>
  );
};

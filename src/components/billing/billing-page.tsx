import React, { FC, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { useMe } from 'gql/user';
import { Loading } from 'components/common/loading';
import { Currency } from './currency';
import { BalanceRefill } from './balance-refill';
import { BalanceWithdrawal } from './balance-withdrawal';
import { TransactionType } from 'gql/types/globalTypes';

export interface BillingPageProps extends RouteComponentProps {}

export const BillingPage: FC<BillingPageProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading: loadingMe } = useMe();

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.refill,
  );
  const handleTransactionTypeChange = (
    e: ChangeEvent<{}>,
    type: TransactionType,
  ) => {
    setTransactionType(type);
  };

  if (loadingMe) {
    return <Loading />;
  }

  return (
    <Box className={c.root}>
      <Currency className={c.balance} value={me?.balance.balance} />
      <Typography className={c.balanceLabel}>{t('On Balance')}</Typography>

      <Tabs
        value={transactionType}
        onChange={handleTransactionTypeChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        className={c.tabs}
      >
        <Tab label={t('Refill')} value={TransactionType.refill} />
        <Tab label={t('Withdrawal')} value={TransactionType.withdrawal} />
      </Tabs>

      {transactionType === TransactionType.refill && (
        <Box pt={1}>
          <BalanceRefill />
        </Box>
      )}

      {transactionType === TransactionType.withdrawal && <BalanceWithdrawal />}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      maxWidth: 400,
      textAlign: 'center',
      margin: 'auto',
      padding: t.spacing(6, 0, 2.5),
      [t.breakpoints.up('md')]: {
        padding: t.spacing(8, 0, 5),
        maxWidth: 460,
      },
    },
    balance: {
      fontSize: '3.6rem',
      lineHeight: '1.3',
      fontWeight: t.typography.fontWeightLight,
    },
    balanceLabel: {
      textTransform: 'uppercase',
      fontSize: '1.05rem',
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
    },
    tabs: {
      marginTop: t.spacing(1.75),
      marginBottom: t.spacing(1.5),
      borderBottom: `1px solid ${t.palette.divider}`,
      [t.breakpoints.up('md')]: {
        marginTop: t.spacing(2),
        marginBottom: t.spacing(2),
        borderWidth: 2,
      },
    },
  }),
);

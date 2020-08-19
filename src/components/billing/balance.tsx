import React, { FC, MouseEvent } from 'react';
import { navigate } from '@reach/router';
import { BILLING_ROUTE } from 'routes';
import { makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Currency } from './currency';

export interface BalanceProprs {
  balance: number;
}

export const Balance: FC<BalanceProprs> = ({ balance }) => {
  const c = useStyles();

  function handleBalanceClick(e: MouseEvent) {
    e.preventDefault();
    navigate(BILLING_ROUTE);
  }

  return (
    <Button
      variant='text'
      color='default'
      href={BILLING_ROUTE}
      className={c.root}
      onClick={handleBalanceClick}
    >
      <FontAwesomeIcon icon={faWallet} className={c.icon} />
      <Currency value={balance} />
    </Button>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      opacity: 0.85,
      padding: 0,
      // fontSize: '1.1rem',
      fontWeight: theme.typography.fontWeightMedium,
      // [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
      // },
    },
    icon: {
      fontSize: '0.95rem',
      marginRight: theme.spacing(1),
      color: theme.palette.grey[700],
      [theme.breakpoints.up('md')]: {
        fontSize: '1.05rem',
        marginRight: theme.spacing(1.25),
        marginTop: 1,
      },
    },
  }),
);

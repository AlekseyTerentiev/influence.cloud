import React, { FC, HTMLAttributes } from 'react';
import { Link } from '@reach/router';
import { BILLING_ROUTE } from 'routes';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Currency } from './currency';

export interface BalanceProps extends HTMLAttributes<HTMLDivElement> {
  amount: number;
}

export const Balance: FC<BalanceProps> = ({ amount, ...otherProps }) => {
  const c = useStyles();

  return (
    <Link to={BILLING_ROUTE}>
      <Box className={clsx(c.root, otherProps.className)} {...otherProps}>
        <FontAwesomeIcon icon={faWallet} className={c.icon} />
        <Currency className={c.amount} value={amount} />
      </Box>
    </Link>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      opacity: 0.9,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: '0.95rem',
      marginRight: t.spacing(1),
      color: t.palette.grey[600],
      [t.breakpoints.up('md')]: {
        marginRight: t.spacing(1.25),
        marginTop: 1,
      },
    },
    amount: {
      fontWeight: t.typography.fontWeightMedium,
      fontSize: '1.2rem',
      lineHeight: 1,
    },
  }),
);

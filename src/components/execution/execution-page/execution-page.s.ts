import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    addAccountBlock: {
      textAlign: 'center',
      paddingTop: '30vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
      [t.breakpoints.only('sm')]: {
        paddingBottom: t.spacing(4),
      },
      [t.breakpoints.down('xs')]: {
        margin: t.spacing(0, -3),
      },
    },
    account: {
      paddingTop: t.spacing(5),
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-evenly',
    },
    label: {
      color: t.palette.text.secondary,
      textTransform: 'uppercase',
      fontSize: '0.8rem',
      letterSpacing: 1,
    },
    avatar: {
      width: 56,
      height: 56,
      marginBottom: t.spacing(0.8),
    },
    username: {
      fontSize: '1.05rem',
    },
    tabs: {
      marginTop: t.spacing(1.25),
      borderBottom: `1px solid ${t.palette.divider}`,
    },
    rootDesktop: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: t.spacing(5),
      paddingTop: t.spacing(4),
      paddingBottom: t.spacing(4),
      [t.breakpoints.up('sm')]: {
        gridGap: t.spacing(7),
        paddingTop: t.spacing(6.5),
        paddingBottom: t.spacing(6.5),
      },
      [t.breakpoints.up('md')]: {
        gridGap: t.spacing(9),
        paddingTop: t.spacing(7.5),
        paddingBottom: t.spacing(7.5),
      },
      [t.breakpoints.up('lg')]: {
        gridGap: '9vw',
        paddingTop: t.spacing(9),
        paddingBottom: t.spacing(9),
      },
      [t.breakpoints.up('xl')]: {
        gridGap: t.spacing(14),
      },
    },
  }),
);

import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      paddingBottom: t.spacing(3),
    },
    rootDesktop: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1fr)',
      [t.breakpoints.up('sm')]: {
        gridGap: t.spacing(5),
        paddingTop: t.spacing(5),
        paddingBottom: t.spacing(5),
      },
      [t.breakpoints.up('md')]: {
        gridGap: t.spacing(6),
        paddingTop: t.spacing(6),
        paddingBottom: t.spacing(6),
      },
      [t.breakpoints.up('lg')]: {
        gridGap: '12vw',
        paddingTop: t.spacing(8.5),
        paddingBottom: t.spacing(8.5),
      },
      [t.breakpoints.up('xl')]: {
        gridGap: t.spacing(14),
      },
    },
    account: {
      paddingTop: t.spacing(4.5),
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
      marginTop: t.spacing(0.75),
      position: 'sticky',
      top: 0,
      background: 'white',
      borderBottom: `1px solid ${t.palette.divider}`,
    },
    tab: {
      letterSpacing: -0.4,
    },
  }),
);

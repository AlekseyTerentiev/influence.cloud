import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: t.spacing(4),
      paddingTop: t.spacing(3),
      paddingBottom: t.spacing(3),
      [t.breakpoints.up('sm')]: {
        gridGap: t.spacing(5),
        paddingTop: t.spacing(4.5),
        paddingBottom: t.spacing(4.5),
      },
      [t.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
        gridGap: t.spacing(8),
        paddingTop: t.spacing(8),
        paddingBottom: t.spacing(8),
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
    header: {
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: t.typography.fontWeightBold,
      letterSpacing: -0.64,
      marginBottom: t.spacing(1.5),
    },
  }),
);

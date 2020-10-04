import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    label: {
      color: 'rgba(193, 194, 208, 1)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '18px',
      letterSpacing: 0.8,
      marginBottom: t.spacing(0.5),
    },
    type: {
      textTransform: 'capitalize',
    },
    status: {
      marginLeft: t.spacing(1.5),
      textTransform: 'capitalize',
    },
    cancelButton: {
      marginLeft: t.spacing(1),
      color: t.palette.error.main,
    },
    spent: {
      display: 'inline-block',
    },
    budget: {
      display: 'inline-block',
      color: 'rgba(154, 155, 180, 1)',
      fontWeight: 500,
      marginLeft: t.spacing(1.5),
    },
    tip: {
      display: 'inline-block',
      color: 'rgba(154, 155, 180, 1)',
      fontWeight: 500,
      marginLeft: t.spacing(1),
    },
    hint: {
      color: t.palette.text.hint,
    },
  }),
);

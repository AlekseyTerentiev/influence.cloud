import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    spent: {
      fontSize: '1.3rem',
    },
    budget: {
      marginTop: 2,
      color: t.palette.text.secondary,
      fontSize: t.typography.body2.fontSize,
    },
    tip: {
      marginTop: t.spacing(0.5),
      color: t.palette.text.secondary,
      fontSize: t.typography.body2.fontSize,
    },
    taskType: {
      fontSize: t.typography.fontSize,
      color: t.palette.text.secondary,
      letterSpacing: 0.5,
      marginBottom: t.spacing(0.4),
    },
    status: {
      fontSize: t.typography.body2.fontSize,
      textAlign: 'right',
      display: 'block',
    },
    cancelTaskButton: {
      display: 'block',
      padding: t.spacing(0.5, 0),
      float: 'right',
    },
    executions: {
      marginTop: t.spacing(2.5),
    },
  }),
);

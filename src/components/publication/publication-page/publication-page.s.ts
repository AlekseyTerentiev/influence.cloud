import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      paddingTop: t.spacing(3),
      paddingBottom: t.spacing(3),
    },
    rootDesktop: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: t.spacing(4),
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
    createdTasks: {
      [t.breakpoints.up('md')]: {
        order: 1,
      },
    },
    header: {
      fontSize: t.typography.h6.fontSize,
      fontWeight: t.typography.h6.fontWeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: t.spacing(0.75),
      marginBottom: t.spacing(1.5),
      borderBottom: `1px solid ${t.palette.divider}`,
      [t.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
    tasksCount: {
      color: t.palette.text.hint,
    },
    tasks: {
      [t.breakpoints.up('md')]: {
        maxHeight: 560,
        overflowY: 'scroll',
      },
    },
    task: {
      display: 'flex',
      background: t.palette.background.paper,
      border: `1px solid ${t.palette.divider}`,
      borderRadius: t.shape.borderRadius,
      cursor: 'pointer',
      padding: t.spacing(2),
      marginTop: t.spacing(1),
      '&:hover': {
        background: t.palette.grey[100],
      },
    },
    preview: {
      borderRadius: t.shape.borderRadius,
      height: t.spacing(7),
      width: t.spacing(7),
      objectFit: 'cover',
      marginRight: t.spacing(1.75),
    },
    infoContainer: {
      flex: 1,
      display: 'grid',
      grid: 'auto auto / auto auto',
      gridRowGap: t.spacing(1),
      '& > *': {
        margin: 'auto 0',
      },
    },
    taskType: {
      color: t.palette.text.secondary,
      fontSize: t.typography.body2.fontSize,
      letterSpacing: 0.5,
    },
    executions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    executionsIcon: {
      color: t.palette.text.hint,
      marginRight: 4,
      fontSize: '0.9rem',
    },
    executionsCount: {
      color: t.palette.text.secondary,
      fontSize: 19,
      lineHeight: 1,
    },
    status: {
      fontSize: t.typography.body2.fontSize,
    },
    spent: {
      color: t.palette.text.secondary,
      textAlign: 'right',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 19,
    },
    spentLabel: {
      textTransform: 'lowercase',
      letterSpacing: 0.2,
      color: t.palette.text.hint,
      fontSize: t.typography.body2.fontSize,
      marginRight: 6,
    },
    spentNumber: {
      lineHeight: 1,
    },
    noTasksHint: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
    },
  }),
);

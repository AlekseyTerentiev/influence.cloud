import { makeStyles, createStyles, Theme, lighten } from '@material-ui/core';

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
        paddingTop: t.spacing(5),
        paddingBottom: t.spacing(5),
      },
      [t.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
        gridGap: t.spacing(6),
        paddingTop: t.spacing(6),
        paddingBottom: t.spacing(6),
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
      borderRadius: t.shape.borderRadius * 3,
      cursor: 'pointer',
      padding: t.spacing(1.5),
      marginTop: t.spacing(1),
      '&:hover': {
        background: t.palette.grey[100],
      },
    },
    infoContainer: {
      flex: 1,
      display: 'grid',
      grid: 'auto auto / auto auto',
    },
    taskType: {
      // textTransform: 'capitalize',
      color: lighten(t.palette.text.primary, 0.3),
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0.5,
    },
    executions: {
      fontSize: 16,
      height: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      color: 'rgba(154, 155, 180, 1)',
    },
    executionsIcon: {
      marginLeft: t.spacing(0.5),
      width: 14,
      height: 14,
    },
    status: {
      fontSize: 15,
      lineHeight: '18px',
      display: 'flex',
      alignItems: 'flex-end',
    },
    spent: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      textAlign: 'right',
      fontSize: 15,
      lineHeight: '18px',
      fontWeight: 500,
      letterSpacing: '0.8px',
    },
    noTasksHint: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
    },
  }),
);

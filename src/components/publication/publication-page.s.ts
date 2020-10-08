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
      paddingBottom: t.spacing(1.5),
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
      border: `1px solid ${t.palette.divider}`,
      borderRadius: t.shape.borderRadius * 3,
      background: t.palette.background.paper,
      padding: t.spacing(2),
      marginTop: t.spacing(1.5),
      cursor: 'pointer',
      '&:hover': {
        background: t.palette.grey[100],
      },
    },
    infoContainer: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    info: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '20px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    requests: {
      borderRadius: t.shape.borderRadius * 5,
      background: t.palette.primary.main,
      color: 'white',
      fontSize: 12,
      fontWeight: 500,
      padding: t.spacing(0, 1),
      marginLeft: t.spacing(0.8),
    },
    executions: {
      fontSize: 18,
      height: 20,
      display: 'flex',
      alignItems: 'center',
      marginLeft: t.spacing(1),
    },
    executionsIcon: {
      marginTop: 1,
      marginLeft: t.spacing(0.7),
    },
    typeAndStatus: {
      display: 'flex',
      alignItems: 'center',
      color: t.palette.text.secondary,
      marginRight: t.spacing(1),
      overflow: 'hidden',
    },
    status: {
      fontSize: 15,
      lineHeight: '16px',
      display: 'flex',
      marginLeft: t.spacing(0.75),
    },
    spent: {
      color: t.palette.text.secondary,
      fontSize: 16,
      lineHeight: '16px',
      letterSpacing: 0.8,
    },
    noTasksHint: {
      marginTop: t.spacing(1.5),
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
    },
  }),
);

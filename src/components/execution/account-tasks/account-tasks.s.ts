import { makeStyles, createStyles, Theme, lighten } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    header: {
      fontSize: t.typography.h6.fontSize,
      fontWeight: t.typography.h6.fontWeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: t.spacing(1.25),
    },
    tasksCount: {
      color: t.palette.text.hint,
    },
    tasks: {
      [t.breakpoints.up('md')]: {
        borderTop: `2px solid ${t.palette.divider}`,
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
      display: 'grid',
      grid: 'auto auto / auto auto',
    },
    taskType: {
      color: lighten(t.palette.text.primary, 0.25),
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0.5,
    },
    reward: {
      fontSize: '1.3rem',
      lineHeight: '26px',
      fontWeight: t.typography.fontWeightMedium,
      textAlign: 'right',
      letterSpacing: 0.8,
    },
    status: {
      fontSize: 15,
      lineHeight: '18px',
      display: 'flex',
      alignItems: 'flex-end',
    },
    payout: {
      fontSize: 15,
      lineHeight: '18px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      color: t.palette.text.hint,
    },
    noTasksHint: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.text.hint,
      marginTop: t.spacing(1),
      [t.breakpoints.down('xs')]: {
        marginTop: t.spacing(2.5),
        marginLeft: t.spacing(3),
      },
    },
  }),
);

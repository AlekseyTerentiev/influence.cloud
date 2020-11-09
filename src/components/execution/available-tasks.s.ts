import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    header: {
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
        MsOverflowStyle: 'none', // IE and Edge
        scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari and Opera
        },
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
    title: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '20px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    reward: {
      fontSize: '1.24rem',
      lineHeight: '26px',
      fontWeight: t.typography.fontWeightMedium,
      textAlign: 'right',
      letterSpacing: 0.8,
      marginLeft: t.spacing(0.5),
    },
    type: {
      display: 'flex',
      alignItems: 'center',
      color: t.palette.text.secondary,
    },
    approval: {
      fontSize: 15,
      lineHeight: '16px',
      color: t.palette.text.hint,
      // color: t.palette.text.secondary,
      marginLeft: t.spacing(1),
      whiteSpace: 'nowrap',
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

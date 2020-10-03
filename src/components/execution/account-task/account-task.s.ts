import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    reward: {
      fontSize: 28,
      fontWeight: t.typography.fontWeightMedium,
    },
    taskType: {
      fontSize: t.typography.fontSize,
      color: t.palette.text.secondary,
      letterSpacing: 0.5,
      marginBottom: t.spacing(0.4),
    },
    payout: {
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
    },
    label: {
      fontSize: t.typography.fontSize + 1,
      fontWeight: t.typography.fontWeightMedium,
      marginBottom: t.spacing(0.75),
    },
    checkIcon: {
      marginRight: t.spacing(1),
      color: t.palette.grey[700],
    },
    timer: {
      fontWeight: t.typography.fontWeightMedium,
      color: t.palette.info.main,
      fontSize: t.typography.body1.fontSize,
      textAlign: 'center',
      width: '100%',
    },
  }),
);

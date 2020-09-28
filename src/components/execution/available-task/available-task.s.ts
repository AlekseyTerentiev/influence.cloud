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
    label: {
      fontSize: t.typography.fontSize + 1,
      fontWeight: t.typography.fontWeightMedium,
      marginBottom: 3,
    },
    requirements: {
      fontSize: t.typography.body2.fontSize,
    },
    checkbox: {
      '& .MuiSvgIcon-root': {
        width: '0.92em',
        height: '0.92em',
      },
    },
  }),
);

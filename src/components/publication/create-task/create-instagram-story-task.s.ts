import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    helpText: {
      color: t.palette.text.secondary,
      fontSize: '0.9rem',
      margin: t.spacing(0.5, 1, 1, 1),
    },
    swipeableViews: {
      margin: t.spacing(0, -3),
    },
    swipeableView: {
      padding: t.spacing(0, 3),
    },
    switchableTextField: {
      position: 'relative',
    },
    switch: {
      position: 'absolute',
      right: t.spacing(2),
      top: '53%',
      transform: 'translateY(-50%)',
    },
    backButton: {
      marginRight: t.spacing(1),
      color: t.palette.text.hint,
      border: `1px solid ${t.palette.divider}`,
      borderRadius: t.shape.borderRadius,
      padding: 11,
    },
  }),
);

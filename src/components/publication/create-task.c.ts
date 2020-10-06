import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    header: {
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: t.typography.fontWeightBold,
      letterSpacing: -0.64,
      marginBottom: t.spacing(1.5),
    },
  }),
);

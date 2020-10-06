import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      paddingTop: t.spacing(1),
    },
    header: {
      textAlign: 'center',
      fontSize: t.typography.h5.fontSize,
      fontWeight: t.typography.h5.fontWeight,
      marginBottom: t.spacing(0.5),
    },
    subheader: {
      textAlign: 'center',
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
      marginBottom: t.spacing(1.75),
    },
  }),
);

import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    header: {
      marginBottom: t.spacing(1.5),
    },
  }),
);

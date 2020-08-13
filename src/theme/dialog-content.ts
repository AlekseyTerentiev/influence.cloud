import { Theme } from '@material-ui/core';

export const MuiDialogContent = (theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 4, 4),
    paddingTop: theme.spacing(4.5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 6, 5),
      paddingTop: theme.spacing(6.5),
    },
  },
});

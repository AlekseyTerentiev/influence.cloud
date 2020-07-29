import { Theme } from '@material-ui/core';

export const MuiAppBar = (theme: Theme) => ({
  root: {
    borderBottom: `1px solid rgba(0,0,0,0.09)`,
    paddingTop: theme.spacing(2.25),
    paddingBottom: theme.spacing(1.6),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2),
    },
  },
});

import { Theme } from '@material-ui/core';

export const MuiAppBar = (t: Theme) => ({
  root: {
    borderBottom: `1px solid rgba(0,0,0,0.09)`,
    paddingTop: t.spacing(2.25),
    paddingBottom: t.spacing(1.5),
    [t.breakpoints.up('md')]: {
      paddingTop: t.spacing(2.5),
      paddingBottom: t.spacing(1.5),
    },
  },
});

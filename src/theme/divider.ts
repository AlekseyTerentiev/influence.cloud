import { Theme } from '@material-ui/core';

export const MuiDivider = (t: Theme) => ({
  root: {
    height: 1,
    [t.breakpoints.up('md')]: {
      height: 2,
    },
  },
});

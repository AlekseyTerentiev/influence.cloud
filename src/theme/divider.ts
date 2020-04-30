import { Theme } from '@material-ui/core';

export const MuiDivider = (theme: Theme) => ({
  root: {
    height: 1,
    [theme.breakpoints.up('md')]: {
      height: 2,
    },
  },
});

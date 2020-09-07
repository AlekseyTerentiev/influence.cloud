import { Theme } from '@material-ui/core';

export const MuiAppBar = (t: Theme) => ({
  root: {
    borderBottom: `1px solid ${t.palette.grey[300]}`,
    paddingTop: t.spacing(2),
    paddingBottom: t.spacing(1.5),
  },
});

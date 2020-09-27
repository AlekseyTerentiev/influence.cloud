import { Theme } from '@material-ui/core';

const fixed: 'fixed' = 'fixed';

export const MuiBottomNavigation = (t: Theme) => ({
  root: {
    zIndex: 1,
    width: '100%',
    position: fixed,
    bottom: 0,
    left: 0,
    paddingLeft: t.spacing(3),
    paddingRight: t.spacing(3),
    [t.breakpoints.up('sm')]: {
      paddingLeft: t.spacing(4),
      paddingRight: t.spacing(4),
    },
  },
});

import { Theme } from '@material-ui/core';

export const MuiContainer = (t: Theme) => ({
  root: {
    paddingLeft: t.spacing(3),
    paddingRight: t.spacing(3),
    [t.breakpoints.up('sm')]: {
      paddingLeft: t.spacing(4),
      paddingRight: t.spacing(4),
    },
    [t.breakpoints.up('md')]: {
      paddingLeft: t.spacing(5),
      paddingRight: t.spacing(5),
    },
    // [`@media (min-width:${t.breakpoints.values.lg + t.spacing(6)}px)`]: {
    //   paddingLeft: 0,
    //   paddingRight: 0,
    // },
  },
});

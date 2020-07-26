import { Theme } from '@material-ui/core';

export const MuiFormControl = (theme: Theme) => ({
  root: {},
  marginDense: {
    marginTop: 0,
    marginBottom: theme.spacing(1.15),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1.25),
    },
  },
  marginNormal: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
});

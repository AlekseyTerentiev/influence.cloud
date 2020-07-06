import { Theme } from '@material-ui/core';

export const MuiFormControl = (theme: Theme) => ({
  root: {},
  marginDense: {
    marginTop: 0,
    marginBottom: theme.spacing(1.1),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1.2),
    },
  },
});

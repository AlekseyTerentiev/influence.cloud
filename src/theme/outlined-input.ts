import { Theme } from '@material-ui/core';

export const MuiOutlinedInput = (theme: Theme) => ({
  root: {
    fontSize: 16,
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      fontSize: 18,
      borderRadius: theme.shape.borderRadius * 2,
    },
    '&$focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
    '&$disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
    },
  },
  input: {
    paddingTop: 33,
    paddingBottom: 9,
  },
  inputMarginDense: {
    paddingTop: 33,
    paddingBottom: 9,
  },
  adornedEnd: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
    },
  },
  notchedOutline: {
    '&$disabled': {
      borderColor: 'red',
    },
    top: 0,
    borderColor: theme.palette.divider,
    [theme.breakpoints.up('md')]: {
      borderWidth: 2,
    },
    '& legend': {
      display: 'none',
    },
  },
});

import { Theme } from '@material-ui/core';

export const MuiOutlinedInput = (theme: Theme) => ({
  root: {
    fontSize: 16,
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontSize: 22,
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
    paddingTop: 15,
    paddingBottom: 15,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 17,
      paddingBottom: 17,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 19,
      paddingBottom: 19,
    },
  },
  inputMarginDense: {
    marginTop: 0,
    paddingTop: 11,
    paddingBottom: 11,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 13,
      paddingBottom: 13,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 15,
      paddingBottom: 15,
    },
  },
  adornedEnd: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
    },
  },
  notchedOutline: {
    borderColor: theme.palette.divider,
    [theme.breakpoints.up('md')]: {
      borderWidth: 2,
    },
  },
});

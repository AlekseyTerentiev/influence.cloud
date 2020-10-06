import { Theme } from '@material-ui/core';

export const MuiOutlinedInput = (t: Theme) => ({
  root: {
    borderRadius: t.shape.borderRadius * 3,
    fontWeight: 500,
    '&$focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      [t.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
    '&$disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: t.palette.divider,
    },
  },
  input: {
    paddingTop: '33px !important', // todo: remove !important
    paddingBottom: '8px !important', // todo: remove !important
  },
  inputMarginDense: {
    paddingTop: '33px !important', // todo: remove !important
    paddingBottom: '8px !important', // todo: remove !important
  },
  adornedEnd: {
    paddingRight: t.spacing(2),
    [t.breakpoints.up('md')]: {
      paddingRight: t.spacing(3),
    },
  },
  notchedOutline: {
    '&$disabled': {
      borderColor: 'red',
    },
    top: 0,
    borderColor: t.palette.divider,
    // [t.breakpoints.up('md')]: {
    //   borderWidth: 2,
    // },
    '& legend': {
      display: 'none',
    },
  },
});

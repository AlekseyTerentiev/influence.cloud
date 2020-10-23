import { Theme } from '@material-ui/core';

export const MuiOutlinedInput = (t: Theme) => ({
  root: {
    background: 'white',
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
    paddingTop: '28px !important', // todo: remove !important
    paddingBottom: '7px !important', // todo: remove !important
    paddingLeft: 12,
    paddingRight: 12,
  },
  inputMarginDense: {
    paddingTop: '28px !important', // todo: remove !important
    paddingBottom: '7px !important', // todo: remove !important
    paddingLeft: 12,
    paddingRight: 12,
  },
  adornedStart: {
    paddingLeft: 12,
  },
  adornedEnd: {
    paddingRight: 12,
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

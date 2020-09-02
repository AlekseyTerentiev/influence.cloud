import { Theme } from '@material-ui/core';

export const MuiInputBase = (t: Theme) => ({
  root: {
    '&$disabled': {
      color: t.palette.text.disabled,
    },
    // '& input::placeholder': {
    //   opacity: 1,
    // },
    paddingTop: '0 !important', // todo: remove
    paddingBottom: '0 !important', // todo: remove
  },
  input: {
    padding: '6px 0',
  },
});

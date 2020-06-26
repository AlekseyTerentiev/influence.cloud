import { Theme } from '@material-ui/core';

export const MuiInputBase = (theme: Theme) => ({
  root: {
    '&$disabled': {
      color: theme.palette.text.disabled,
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

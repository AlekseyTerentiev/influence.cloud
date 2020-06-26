import { Theme } from '@material-ui/core';

export const MuiFilledInput = (theme: Theme) => ({
  underline: {
    backgroundColor: '#F0F2F7 !important',
    borderRadius: theme.shape.borderRadius,
    '&::before': {
      border: 'none',
    },
    '& input': {
      borderRadius: 4,
    },
  },
  input: {
    paddingTop: '32px !important', // todo: remove !important
    paddingBottom: '8px !important', // todo: remove !important
  },
  inputMarginDense: {
    paddingTop: '32px !important', // todo: remove !important
    paddingBottom: '8px !important', // todo: remove !important
  },
});

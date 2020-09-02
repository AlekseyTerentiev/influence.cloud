import { Theme } from '@material-ui/core';

export const MuiFilledInput = (t: Theme) => ({
  underline: {
    backgroundColor: '#F0F2F7 !important',
    borderRadius: t.shape.borderRadius,
    '&::before': {
      border: 'none',
    },
    '& input': {
      borderRadius: t.shape.borderRadius,
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

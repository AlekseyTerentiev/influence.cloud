import { Theme } from '@material-ui/core';

export const MuiFilledInput = (theme: Theme) => ({
  inputMarginDense: {
    paddingTop: 28,
    paddingBottom: 8,
  },
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
    paddingTop: 32,
    paddingBottom: 8,
  },
});

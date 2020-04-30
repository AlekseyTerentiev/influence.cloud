import { Theme } from '@material-ui/core';

export const MuiFilledInput = (theme: Theme) => ({
  input: {
    fontSize: '15px !important',
    padding: '18px 16px 14px !important',
  },
  underline: {
    backgroundColor: '#F0F2F7 !important',
    borderRadius: 4,
    '&::before': {
      border: 'none',
    },
    '& input': {
      borderRadius: 4,
    },
  },
});

import { Theme } from '@material-ui/core';

export const MuiInputLabel = (t: Theme) => ({
  filled: {
    color: '#A1A4A7',
    transform: 'translate(12px, 22px) scale(1)',
    '&$shrink': {
      transform: 'translate(12px, 12px) scale(0.7)',
    },
    '&$marginDense': {
      transform: 'translate(14px, 22px) scale(1)',
      '&$shrink': {
        transform: 'translate(14px, 12px) scale(0.7)',
      },
    },
  },
  outlined: {
    transform: 'translate(12px, 22px) scale(1)',
    '&$shrink': {
      transform: 'translate(14px, 12px) scale(0.7)',
    },
    '&$marginDense': {
      transform: 'translate(12px, 22px) scale(1)',
      '&$shrink': {
        transform: 'translate(14px, 12px) scale(0.7)',
      },
    },
  },
});

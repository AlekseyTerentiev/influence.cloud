import { Theme } from '@material-ui/core';

export const MuiInputLabel = (theme: Theme) => ({
  filled: {
    color: '#A1A4A7',
    transform: 'translate(12px, 24px) scale(1)',
    '&$shrink': {
      transform: 'translate(12px, 12px) scale(0.7)',
    },
    '&$marginDense': {
      transform: 'translate(12px, 24px) scale(1)',
      '&$shrink': {
        transform: 'translate(12px, 12px) scale(0.7)',
      },
    },
  },
  outlined: {
    transform: 'translate(14px, 24px) scale(1)',
    '&$shrink': {
      transform: 'translate(14px, 12px) scale(0.7)',
    },
    '&$marginDense': {
      transform: 'translate(14px, 24px) scale(1)',
      '&$shrink': {
        transform: 'translate(14px, 12px) scale(0.7)',
      },
    },
  },
});

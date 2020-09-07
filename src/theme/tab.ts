import { Theme } from '@material-ui/core';

const none: 'none' = 'none';
const nowrap: 'nowrap' = 'nowrap';

export const MuiTab = (t: Theme) => ({
  root: {
    textTransform: none,
    whiteSpace: nowrap,
    fontWeight: t.typography.fontWeightMedium,
    maxWidth: 'none',
    minWidth: 'auto !important',
    fontSize: '0.98rem',
    [t.breakpoints.up('lg')]: {
      fontSize: '1.05rem',
    },
  },
  textColorInherit: {
    opacity: 0.9,
    '&$selected, &:hover': {
      opacity: 0.6,
    },
  },
});

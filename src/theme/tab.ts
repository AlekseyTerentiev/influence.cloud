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
    '&$selected, &:hover': {
      color: '#B0B7C8',
    },
    fontSize: '0.98rem',
    [t.breakpoints.up('lg')]: {
      fontSize: '1.05rem',
    },
  },
});

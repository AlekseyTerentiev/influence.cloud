import { Theme } from '@material-ui/core';

const none: 'none' = 'none';
const nowrap: 'nowrap' = 'nowrap';

export const MuiTab = (theme: Theme) => ({
  root: {
    textTransform: none,
    whiteSpace: nowrap,
    fontWeight: theme.typography.fontWeightMedium,
    maxWidth: 'none',
    minWidth: 'auto !important',
    '&$selected, &:hover': {
      color: '#B0B7C8',
    },
    fontSize: '0.98rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.05rem',
    },
  },
});

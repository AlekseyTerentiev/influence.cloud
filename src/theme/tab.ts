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
    // opacity: '0.9 !important',
    '&$selected, &:hover': {
      color: '#B0B7C8',
    },
    '&:first-of-type': {
      paddingLeft: 0,
    },
    fontSize: 14,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      fontSize: 16,
    },
  },
});

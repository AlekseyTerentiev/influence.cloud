import { Theme, lighten } from '@material-ui/core';

const none: 'none' = 'none';

export const MuiButton = (theme: Theme) => ({
  root: {
    color: lighten(theme.palette.text.primary, 0.2),
    textTransform: none,
    boxShadow: 'none !important',
    '& img': {
      height: 16,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5, 3),
      '& img': {
        height: 18,
        marginRight: theme.spacing(1.5),
      },
    },
  },
  textSizeSmall: {
    lineHeight: 1.4,
    fontSize: '0.9rem',
  },
  contained: {
    '&$disabled': {
      backgroundColor: theme.palette.grey[200],
      color: 'white',
    },
  },
});

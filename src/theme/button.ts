import { Theme } from '@material-ui/core';

const none: 'none' = 'none';

export const MuiButton = (theme: Theme) => ({
  root: {
    textTransform: none,
    boxShadow: 'none !important',
    fontSize: 16,
    lineHeight: '20px',
    padding: theme.spacing(1.2, 2),
    borderRadius: theme.shape.borderRadius,
    '& img': {
      height: 16,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5, 3),
      fontSize: 18,
      lineHeight: '22px',
      borderRadius: theme.shape.borderRadius * 2,
      '& img': {
        height: 20,
        marginRight: theme.spacing(1.5),
      },
    },
  },
  containedSizeSmall: {
    padding: '6px 12px',
    fontSize: 14,
    lineHeight: '20px',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      padding: '8px 16px',
      fontSize: 16,
      lineHeight: '24px',
    },
  },
  containedSizeLarge: {
    padding: theme.spacing(1.5, 3.5),
    fontSize: 17,
    lineHeight: '24px',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.8, 4),
      fontSize: 18,
      lineHeight: '22px',
    },
  },
  contained: {
    '&$disabled': {
      backgroundColor: theme.palette.grey[200],
      color: 'white',
    },
  },
});

import { Theme /*, lighten*/ } from '@material-ui/core';

const none: 'none' = 'none';

export const MuiButton = (t: Theme) => ({
  root: {
    minWidth: 'initial',
    textTransform: none,
    borderRadius: t.shape.borderRadius * 3,
    boxShadow: 'none !important',
    '& img': {
      height: 16,
      marginRight: t.spacing(1),
    },
    [t.breakpoints.up('md')]: {
      '& img': {
        height: 18,
        marginRight: t.spacing(1.5),
      },
    },
  },
  containedSizeSmall: {
    padding: t.spacing(0.5, 2),
    borderRadius: t.shape.borderRadius * 2,
  },
  textSizeSmall: {
    lineHeight: 1.4,
    fontSize: '0.9rem',
  },
  contained: {
    '&$disabled': {
      backgroundColor: 'rgba(225, 226, 236, 1)',
      color: 'white',
    },
  },
});

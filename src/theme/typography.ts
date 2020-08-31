import { Theme } from '@material-ui/core';

export const MuiTypography = (theme: Theme) => ({
  h1: {
    // fontWeight: theme.typography.fontWeightBold,
    // fontSize: 32,
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 40,
    // },
    // [theme.breakpoints.up('md')]: {
    //   fontSize: 64,
    // },
  },
  h2: {
    // fontWeight: theme.typography.fontWeightBold,
    // fontSize: 28,
    // lineHeight: '40px',
    // '&$gutterBottom': {
    //   marginBottom: theme.spacing(2),
    // },
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 32,
    //   lineHeight: '50px',
    //   '&$gutterBottom': {
    //     marginBottom: theme.spacing(3),
    //   },
    // },
    // [theme.breakpoints.up('md')]: {
    //   fontSize: 48,
    //   lineHeight: '60px',
    //   '&$gutterBottom': {
    //     marginBottom: theme.spacing(4.5),
    //   },
    // },
  },
  h3: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 24,
    '&$gutterBottom': {
      marginBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 30,
      '&$gutterBottom': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  h4: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 23,
    '&$gutterBottom': {
      marginBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 26,
      '&$gutterBottom': {
        marginBottom: theme.spacing(1.5),
      },
    },
  },
  h5: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 22,
    '&$gutterBottom': {
      marginBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
      '&$gutterBottom': {
        marginBottom: theme.spacing(1.5),
      },
    },
  },
  h6: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 26,
    '&$gutterBottom': {
      marginBottom: theme.spacing(1.5),
    },
  },
  body1: {
    '&$gutterBottom': {
      marginBottom: theme.spacing(1),
    },
  },
  body2: {
    '&$gutterBottom': {
      marginBottom: '0.4em',
    },
  },
});

import { Theme } from '@material-ui/core';

export const MuiTypography = (theme: Theme) => ({
  h1: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '2.2rem',
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 40,
    // },
    // [theme.breakpoints.up('md')]: {
    //   fontSize: 64,
    // },
  },
  h2: {
    fontWeight: theme.typography.fontWeightLight,
    // fontSize: 30,
    fontSize: '2rem',
    // lineHeight: '44px',
    // '&$gutterBottom': {
    //   marginBottom: theme.spacing(2),
    // },
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 34,
    //   // lineHeight: '54px',
    //   '&$gutterBottom': {
    //     marginBottom: theme.spacing(3),
    //   },
    // },
    [theme.breakpoints.up('md')]: {
      // fontSize: 50,
      // fontSize: '1.9rem',
      // lineHeight: '64px',
      // '&$gutterBottom': {
      //   marginBottom: theme.spacing(4.5),
      // },
    },
  },
  h3: {
    fontWeight: theme.typography.fontWeightRegular,
    // fontSize: 26,
    fontSize: '1.8rem',
    // lineHeight: '28px',
    // '&$gutterBottom': {
    //   marginBottom: theme.spacing(1.5),
    // },
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 28,
    //   lineHeight: '36px',
    // },
    [theme.breakpoints.up('md')]: {
      // fontSize: 32,
      // fontSize: '1.7rem',
      // lineHeight: '48px',
      // '&$gutterBottom': {
      //   marginBottom: theme.spacing(2),
      // },
    },
  },
  h4: {
    fontWeight: theme.typography.fontWeightMedium,
    // fontSize: 24,
    fontSize: '1.6rem',
    // lineHeight: '36px',
    // '&$gutterBottom': {
    //   marginBottom: theme.spacing(0.5),
    // },
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 26,
    //   // lineHeight: '40px',
    // },
    [theme.breakpoints.up('md')]: {
      fontSize: 28,
      // lineHeight: '48px',
      // '&$gutterBottom': {
      //   marginBottom: theme.spacing(1),
      // },
    },
  },
  h5: {
    fontWeight: theme.typography.fontWeightRegular,
    // fontSize: 22,
    fontSize: '1.4rem',
    // lineHeight: '36px',
    // '&$gutterBottom': {
    //   marginBottom: theme.spacing(0.5),
    // },
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 24,
    //   // lineHeight: '40px',
    // },
    [theme.breakpoints.up('md')]: {
      // fontSize: 28,
      // lineHeight: '48px',
      // '&$gutterBottom': {
      //   marginBottom: theme.spacing(1),
      // },
    },
  },
  h6: {
    fontSize: '1.5rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.75rem',
    },
  },

  body1: {
    fontSize: '1.05rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
  },
  caption: {
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
  },
});

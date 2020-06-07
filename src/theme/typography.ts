import { Theme } from '@material-ui/core';

export const MuiTypography = (theme: Theme) => ({
  h1: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 32,
    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 64,
    },
  },
  h2: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 28,
    lineHeight: '40px',
    '&$gutterBottom': {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 32,
      lineHeight: '50px',
      '&$gutterBottom': {
        marginBottom: theme.spacing(3),
      },
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 48,
      lineHeight: '60px',
      '&$gutterBottom': {
        marginBottom: theme.spacing(4.5),
      },
    },
  },
  h3: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 20,
    lineHeight: '28px',
    '&$gutterBottom': {
      marginBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
      lineHeight: '36px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 32,
      lineHeight: '48px',
      '&$gutterBottom': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  h4: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 22,
    lineHeight: '36px',
    '&$gutterBottom': {
      marginBottom: theme.spacing(0.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
      lineHeight: '40px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 28,
      lineHeight: '48px',
      '&$gutterBottom': {
        marginBottom: theme.spacing(1),
      },
    },
  },
  body1: {
    fontSize: 16,
    lineHeight: '24px',
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: 17,
    //   lineHeight: '25px',
    // },
    [theme.breakpoints.up('md')]: {
      fontSize: 18,
      lineHeight: '26px',
    },
  },
  // body2: {
  //   fontSize: 16,
  //   lineHeight: '24px',
  //   '&$gutterBottom': {
  //     marginBottom: theme.spacing(1.5),
  //   },
  //   [theme.breakpoints.up('sm')]: {
  //     fontSize: 18,
  //     lineHeight: '28px',
  //   },
  //   [theme.breakpoints.up('md')]: {
  //     fontSize: 22,
  //     lineHeight: '32px',
  //     '&$gutterBottom': {
  //       marginBottom: theme.spacing(2),
  //     },
  //   },
  // },
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

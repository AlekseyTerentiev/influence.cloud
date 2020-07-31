import { Theme } from '@material-ui/core';

export const MuiDialogContent = (theme: Theme) => ({
  root: {
    '&:first-child': {
      padding: theme.spacing(0, 4, 4),
      paddingTop: theme.spacing(4.5),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 7, 6),
        paddingTop: theme.spacing(7.5),
      },
    },
  },
});

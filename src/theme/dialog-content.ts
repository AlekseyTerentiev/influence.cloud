import { Theme } from '@material-ui/core';

export const MuiDialogContent = (theme: Theme) => ({
  root: {
    '&:first-child': {
      padding: theme.spacing(0, 4, 3.5),
      paddingTop: theme.spacing(5.5),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 6, 4),
        paddingTop: theme.spacing(6.5),
      },
    },
  },
});

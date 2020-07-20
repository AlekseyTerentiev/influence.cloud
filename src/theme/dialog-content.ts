import { Theme } from '@material-ui/core';

export const MuiDialogContent = (theme: Theme) => ({
  root: {
    '&:first-child': {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6),
        paddingTop: theme.spacing(6),
      },
    },
  },
});

import { Theme } from '@material-ui/core';

export const MuiDialog = (theme: Theme) => ({
  paper: {
    borderRadius: theme.shape.borderRadius * 2.5,
    padding: theme.spacing(2.5, 3, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 6, 6),
    },
  },
  paperWidthXs: {
    maxWidth: '515px !important',
  },
});

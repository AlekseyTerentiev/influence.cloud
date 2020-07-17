import { Theme } from '@material-ui/core';

export const MuiDialog = (theme: Theme) => ({
  paper: {
    margin: 'auto',
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2.5, 1.5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 6, 6),
    },
  },
  paperWidthXs: {
    maxWidth: '515px !important',
  },
  paperWidthSm: {
    maxWidth: '555px !important',
  },
});

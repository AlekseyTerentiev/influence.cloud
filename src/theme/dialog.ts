import { Theme } from '@material-ui/core';

export const MuiDialog = (theme: Theme) => ({
  paper: {
    margin: 'auto',
    borderRadius: theme.shape.borderRadius * 1.5,
  },
  paperWidthXs: {
    maxWidth: 515,
  },
  paperWidthSm: {
    maxWidth: 585,
  },
});

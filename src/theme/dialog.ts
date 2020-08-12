import { Theme } from '@material-ui/core';

export const MuiDialog = (theme: Theme) => ({
  paper: {
    margin: 'auto',
    borderRadius: theme.shape.borderRadius * 1.5,
  },
  paperWidthXs: {
    maxWidth: 510,
  },
  paperWidthSm: {
    maxWidth: 585,
  },
  paperFullWidth: {
    width: `calc(100% - ${theme.spacing(6.5)}px)`,
  },
});

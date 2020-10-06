import { Theme } from '@material-ui/core';

export const MuiDialog = (t: Theme) => ({
  paper: {
    margin: 'auto',
    borderRadius: t.shape.borderRadius * 1.5,
  },
  paperWidthXs: {
    maxWidth: 545,
  },
  paperWidthSm: {
    maxWidth: 585,
  },
  paperFullWidth: {
    width: `calc(100% - ${t.spacing(6.5)}px)`,
  },
});

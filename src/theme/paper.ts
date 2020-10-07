import { Theme } from '@material-ui/core';

export const MuiPaper = (t: Theme) => ({
  rounded: {
    borderRadius: t.shape.borderRadius * 3,
  },
});

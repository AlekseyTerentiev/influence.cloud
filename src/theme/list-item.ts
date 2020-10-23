import { Theme } from '@material-ui/core';

export const MuiListItem = (t: Theme) => ({
  root: {
    '&$selected': {
      color: t.palette.primary.main,
      fontWeight: t.typography.fontWeightMedium,
      backgroundColor: 'initial',
    },
  },
});

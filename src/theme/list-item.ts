import { Theme } from '@material-ui/core';

export const MuiListItem = (t: Theme) => ({
  root: {
    '&$selected': {
      color: 'white',
      fontWeight: t.typography.fontWeightMedium,
      backgroundColor: t.palette.primary.main,
      '&:hover': {
        backgroundColor: t.palette.primary.main,
      },
    },
  },
});

import { Theme } from '@material-ui/core';

export const MuiBottomNavigationAction = (theme: Theme) => ({
  root: {
    '&.MuiBottomNavigationAction-iconOnly': {
      paddingTop: 11,
    },
    '&$selected': {
      paddingTop: 11,
    },
  },
  wrapper: {
    fontSize: '1.75em',
  },
});

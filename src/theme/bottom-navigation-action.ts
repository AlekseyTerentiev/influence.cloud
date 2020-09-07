import { Theme } from '@material-ui/core';

export const MuiBottomNavigationAction = (t: Theme) => ({
  root: {
    maxWidth: 'none',
    borderTop: `1px solid ${t.palette.grey[300]}`,
    '&.MuiBottomNavigationAction-iconOnly': {
      paddingTop: 11,
    },
    '&$selected': {
      paddingTop: 11,
    },
  },
  wrapper: {
    fontSize: '1.73em',
    '& svg': {
      width: '1em',
      height: '1em',
    },
  },
});

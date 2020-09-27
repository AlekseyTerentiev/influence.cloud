import { Theme } from '@material-ui/core';

export const MuiBottomNavigationAction = (t: Theme) => ({
  root: {
    paddingLeft: '0',
    paddingRight: '0',

    '&:first-child': {
      justifyContent: 'flex-start',
    },
    '&:last-child': {
      justifyContent: 'flex-end',
    },

    color: t.palette.text.primary,
    maxWidth: 'none',
    borderTop: `1px solid ${t.palette.divider}`,
    '&.MuiBottomNavigationAction-iconOnly': {
      paddingTop: 11,
    },
    '&$selected': {
      paddingTop: 11,
    },
  },
  wrapper: {
    fontSize: '1.73em',
    width: 'auto',
    '& svg': {
      width: '1em',
      height: '1em',
    },
  },
});

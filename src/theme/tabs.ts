import { Theme } from '@material-ui/core';

export const MuiTabs = (t: Theme) => ({
  root: {
    '&$vertical': {
      '& .MuiTab-root': {
        paddingLeft: 0,
        '&:not(:last-of-type)': {
          borderBottom: `1px solid ${t.palette.divider}`,
          [t.breakpoints.up('md')]: {
            borderWidth: 2,
          },
        },
      },
      '& .MuiTab-wrapper': {
        alignItems: 'flex-start',
      },
      padding: 0,
    },
  },
  indicator: {
    // display: 'none',
  },
});

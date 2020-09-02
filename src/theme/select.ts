import { Theme } from '@material-ui/core';

export const MuiSelect = (t: Theme) => ({
  root: {
    paddingRight: 22,
  },
  icon: {
    color: '#8e9194',
    fontSize: '1.4rem',
    top: 'calc(50% - 11px)',
  },
  iconOutlined: {
    right: 14,
  },
  selectMenu: {
    minHeight: 'initial',
  },
});

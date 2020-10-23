import { Theme } from '@material-ui/core';

export const MuiSelect = (t: Theme) => ({
  root: {
    paddingRight: '22px !important',
  },
  icon: {
    color: '#8e9194',
    fontSize: '1.4rem',
    top: 'calc(50% - 10px)',
  },
  iconOutlined: {
    right: 10,
  },
  selectMenu: {
    minHeight: 'initial',
  },
});

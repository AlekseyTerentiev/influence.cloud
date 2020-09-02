import { Theme } from '@material-ui/core';
import defaultImg from 'img/avatar.svg';

export const MuiAvatar = (theme: Theme) => ({
  root: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  colorDefault: {
    background: `url(${defaultImg}) no-repeat`,
    backgroundSize: 'contain',
    color: 'transparent',
  },
  fallback: {
    display: 'none',
  },
});

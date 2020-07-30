import { Theme } from '@material-ui/core';
import defaultImg from 'img/avatar.svg';

export const MuiAvatar = (theme: Theme) => ({
  root: {
    width: 38,
    height: 38,
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

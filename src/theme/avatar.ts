import { Theme } from '@material-ui/core';
import defaultImg from 'img/avatar.svg';

export const MuiAvatar = (t: Theme) => ({
  root: {
    width: t.spacing(5),
    height: t.spacing(5),
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

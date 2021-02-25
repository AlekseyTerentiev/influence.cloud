import { makeStyles, createStyles, Theme } from '@material-ui/core';

import './fonts/index.css';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      '& a': {
        color: 'inherit',
        textDecoration: 'none',
      },
      '& *:focus': {
        outlineColor: t.palette.primary.main,
      },
      '& .MuiPopover-root': {
        zIndex: '99999 !important',
      },
    },
  }),
);

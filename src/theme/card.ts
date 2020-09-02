import { Theme } from '@material-ui/core';

export const MuiCard = (t: Theme) => ({
  root: {
    border: `1px solid ${t.palette.divider}`,
    borderRadius: t.shape.borderRadius * 2,
    padding: t.spacing(3),
    [t.breakpoints.up('sm')]: {
      padding: t.spacing(4.5),
    },
    [t.breakpoints.up('md')]: {
      padding: t.spacing(6),
      borderRadius: t.shape.borderRadius * 2.5,
      borderWidth: 2,
    },
  },
});

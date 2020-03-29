import { Theme } from '@material-ui/core'

export const MuiCard = (theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4.5),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      borderRadius: theme.shape.borderRadius * 2.5,
      borderWidth: 2,
    },
  },
})

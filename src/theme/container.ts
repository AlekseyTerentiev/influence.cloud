import { Theme } from '@material-ui/core'

export const MuiContainer = (theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    [`@media (min-width:${theme.breakpoints.values.lg + theme.spacing(6)}px)`]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
})

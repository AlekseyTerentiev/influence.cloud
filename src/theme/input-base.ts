import { Theme } from '@material-ui/core'

export const MuiInputBase = (theme: Theme) => ({
  root: {
    '&$disabled': {
      color: theme.palette.text.disabled,
    },
    // '& input::placeholder': {
    //   opacity: 1,
    // },
  },
})

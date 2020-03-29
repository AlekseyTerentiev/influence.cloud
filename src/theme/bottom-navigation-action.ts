import { Theme } from '@material-ui/core'

const none: 'none' = 'none'

export const MuiBottomNavigationAction = (theme: Theme) => ({
  iconOnly: {
    fontSize: '1.5em',
    paddingTop: '15px !important',
  },
  selected: {
    fontSize: '1.5em',
    paddingTop: '13px !important',
  },
})

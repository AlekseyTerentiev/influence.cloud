import { Theme } from '@material-ui/core'

export const MuiTabs = (theme: Theme) => ({
  root: {
    '&$vertical': {
      '& .MuiTab-root': {
        paddingLeft: 0,
        '&:not(:last-of-type)': {
          borderBottom: `1px solid ${theme.palette.divider}`,
          [theme.breakpoints.up('md')]: {
            borderWidth: 2,
          },
        },
      },
      '& .MuiTab-wrapper': {
        alignItems: 'flex-start',
      },
      padding: 0,
    },
  },
  indicator: {
    display: 'none',
  },
})

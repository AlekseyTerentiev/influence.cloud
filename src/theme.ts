import { createMuiTheme, responsiveFontSizes, darken, lighten } from '@material-ui/core/styles'

const breakpoints = {
  values: {
    xs: 0,
    sm: 500,
    md: 986,
    lg: 1160,
    xl: 1920,
  },
}

const typography = {
  fontFamily: 'Roboto, Helvetica Neue, Arial, sans-serif',
  fontSize: 15,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
}

const palette = {
  background: {
    default: '#fff',
    paper: '#fff',
  },
  primary: {
    light: 'rgba(44, 104, 214, 0.6)',
    main: 'rgb(44, 104, 214)',
    dark: 'rgb(24, 84, 194)',
    contrastText: '#fff',
  },
  secondary: {
    light: 'rgba(75, 180, 239, 0.6)',
    main: 'rgb(75, 180, 239)',
    dark: 'rgb(75, 180, 239)',
    contrastText: '#fff',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
  },
  text: {
    primary: 'rgba(52, 55, 76, 1)',
    secondary: 'rgba(52, 55, 76, 0.8)',
    disabled: 'rgba(52, 55, 76, 0.5)',
    hint: 'rgba(52, 55, 76, 0.4)',
  },
  divider: 'rgba(0, 0, 0, 0.07)',
  grey: {
    50: '#fafafa',
    100: '#f9f9f9',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#d5d5d5',
    A200: '#aaaaaa',
    A400: '#303030',
    A700: '#616161',
  },
}

const shape = {
  borderRadius: 4,
}

let theme = createMuiTheme({
  breakpoints,
  typography,
  palette,
  shape,
})

theme.props = {
  MuiAppBar: {
    elevation: 0,
  },
  MuiButtonBase: {
    disableRipple: true,
  },
  MuiLink: {
    underline: 'none',
  },
  MuiPaper: {
    elevation: 0,
  },
}

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: 'none',
      boxShadow: 'none !important',
    },
  },
  MuiTabs: {
    root: {
      color: lighten(theme.palette.text.primary, 0.1),
    },
    indicator: {
      height: '1px',
      backgroundColor: lighten(theme.palette.text.primary, 0.4),
    },
  },
  MuiTab: {
    root: {
      textTransform: 'none',
      '&$selected, &:hover': {
        color: darken(theme.palette.text.primary, 0.1),
        fontWeight: 500,
      },
      minWidth: 'auto !important',
    },
  },
  MuiBottomNavigationAction: {
    iconOnly: {
      fontSize: '1.5em',
      paddingTop: '15px !important',
    },
    selected: {
      fontSize: '1.5em',
      paddingTop: '13px !important',
    },
  },
}

theme = responsiveFontSizes(theme)

export { theme }

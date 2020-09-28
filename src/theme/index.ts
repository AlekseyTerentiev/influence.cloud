import { createMuiTheme, lighten, darken } from '@material-ui/core';
import { MuiAppBar } from './app-bar';
import { MuiAvatar } from './avatar';
import { MuiBottomNavigationAction } from './bottom-navigation-action';
import { MuiBottomNavigation } from './bottom-navigation';
import { MuiButton } from './button';
import { MuiCard } from './card';
import { MuiContainer } from './container';
import { MuiDialog } from './dialog';
import { MuiDivider } from './divider';
import { MuiFilledInput } from './filled-input';
import { MuiFormControl } from './form-control';
import { MuiFormLabel } from './form-label';
import { MuiInputAdornment } from './input-adornment';
import { MuiInputBase } from './input-base';
import { MuiInputLabel } from './input-label';
import { MuiOutlinedInput } from './outlined-input';
import { MuiSelect } from './select';
import { MuiTab } from './tab';
import { MuiTabs } from './tabs';
import { MuiToolbar } from './toolbar';

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 986,
      lg: 1160,
      xl: 1920,
    },
  },

  typography: {
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif, -apple-system',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
    background: {
      default: '#fff',
      paper: '#fff',
    },

    primary: {
      light: lighten('rgba(96, 104, 248, 1)', 0.25),
      main: 'rgba(96, 104, 248, 1)',
      dark: darken('rgba(96, 104, 248, 1)', 0.25),
      contrastText: '#fff',
    },

    // secondary: {
    //   light: '',
    //   main: '',
    //   dark: '',
    //   contrastText: '#fff',
    // },

    info: {
      light: 'rgba(49, 176, 255, 1)',
      main: 'rgba(49, 176, 255, 1)',
      dark: 'rgba(49, 176, 255, 1)',
      contrastText: '#fff',
    },

    error: {
      light: 'rgba(251, 86, 145, 1)',
      main: 'rgba(251, 86, 145, 1)',
      dark: 'rgba(251, 86, 145, 1)',
      contrastText: '#fff',
    },

    text: {
      primary: 'rgba(20, 19, 47, 1)',
      secondary: 'rgba(20, 19, 47, 0.6)',
      // disabled: 'rgba(193, 194, 208, 1)',
      hint: 'rgba(193, 194, 208, 1)',
    },

    divider: 'rgba(225, 226, 236, 1)',

    grey: {
      50: '#fafafa',
      100: '#F9F9F9',
      200: '#EDEFF3',
      300: 'rgba(0,0,0,0.0975)',
      400: '#a3a9b8',
      500: '#a1a1af',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
  },

  spacing: 8,

  shape: {
    borderRadius: 4,
  },

  props: {
    MuiAppBar: {
      elevation: 0,
    },
    MuiButtonBase: {
      // disableRipple: true,
    },
    MuiLink: {
      underline: 'none',
    },
    MuiPaper: {
      // elevation: 0,
    },
    MuiCard: {
      elevation: 0,
    },
  },
});

theme.overrides = {
  MuiAppBar: MuiAppBar(theme),
  MuiAvatar: MuiAvatar(theme),
  MuiBottomNavigationAction: MuiBottomNavigationAction(theme),
  MuiBottomNavigation: MuiBottomNavigation(theme),
  MuiButton: MuiButton(theme),
  MuiCard: MuiCard(theme),
  MuiContainer: MuiContainer(theme),
  MuiDialog: MuiDialog(theme),
  MuiDivider: MuiDivider(theme),
  MuiFilledInput: MuiFilledInput(theme),
  MuiFormControl: MuiFormControl(theme),
  MuiFormLabel: MuiFormLabel(theme),
  MuiInputAdornment: MuiInputAdornment(theme),
  MuiInputBase: MuiInputBase(theme),
  MuiInputLabel: MuiInputLabel(theme),
  MuiOutlinedInput: MuiOutlinedInput(theme),
  MuiSelect: MuiSelect(theme),
  MuiTab: MuiTab(theme),
  MuiTabs: MuiTabs(theme),
  MuiToolbar: MuiToolbar(theme),
};

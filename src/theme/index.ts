import { createMuiTheme, lighten, darken } from '@material-ui/core';
import { MuiAppBar } from './app-bar';
import { MuiAvatar } from './avatar';
import { MuiBottomNavigationAction } from './bottom-navigation-action';
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
import { MuiListItem } from './list-item';
import { MuiMenuItem } from './menu-item';
import { MuiMenu } from './menu';
import { MuiOutlinedInput } from './outlined-input';
import { MuiPaper } from './paper';
import { MuiSelect } from './select';
import { MuiTab } from './tab';
import { MuiTabs } from './tabs';
import { MuiToolbar } from './toolbar';

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 720,
      lg: 1100,
      xl: 1920,
    },
  },

  typography: {
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif, -apple-system',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h6: {
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: -0.2,
    },
    body1: {
      letterSpacing: -0.2,
    },
  },

  palette: {
    background: {
      default: '#fff',
      paper: '#fff',
    },

    primary: {
      light: 'rgba(240, 241, 255, 1)',
      main: 'rgba(96, 104, 248, 1)',
      dark: darken('rgba(96, 104, 248, 1)', 0.2),
      contrastText: '#fff',
    },

    secondary: {
      light: lighten('rgba(251, 86, 145, 1)', 0.2),
      main: 'rgba(251, 86, 145, 1)',
      dark: darken('rgba(251, 86, 145, 1)', 0.2),
      contrastText: '#fff',
    },

    success: {
      light: 'rgba(217, 255, 223, 1)',
      main: 'rgba(81, 215, 103, 1)',
      dark: darken('rgba(81, 215, 103, 1)', 0.2),
      contrastText: '#fff',
    },

    info: {
      light: 'rgba(229, 243, 255, 1)',
      main: 'rgba(49, 176, 255, 1)',
      dark: darken('rgba(49, 176, 255, 1)', 0.2),
      contrastText: '#fff',
    },

    error: {
      light: 'rgba(255, 241, 242, 1)',
      main: 'rgba(251, 86, 145, 1)',
      dark: darken('rgba(251, 86, 145, 1)', 0.2),
      contrastText: '#fff',
    },

    text: {
      primary: 'rgba(20, 19, 47, 1)',
      secondary: 'rgba(154, 155, 180, 1)',
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
  MuiListItem: MuiListItem(theme),
  MuiMenuItem: MuiMenuItem(theme),
  MuiMenu: MuiMenu(theme),
  MuiOutlinedInput: MuiOutlinedInput(theme),
  MuiPaper: MuiPaper(theme),
  MuiSelect: MuiSelect(theme),
  MuiTab: MuiTab(theme),
  MuiTabs: MuiTabs(theme),
  MuiToolbar: MuiToolbar(theme),
};

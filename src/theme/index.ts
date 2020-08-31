import { createMuiTheme } from '@material-ui/core';
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
import { MuiInputAdornment } from './input-adornment';
import { MuiInputBase } from './input-base';
import { MuiInputLabel } from './input-label';
import { MuiOutlinedInput } from './outlined-input';
import { MuiSelect } from './select';
import { MuiTab } from './tab';
import { MuiTabs } from './tabs';
import { MuiToolbar } from './toolbar';
import { MuiTypography } from './typography';

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 986,
      lg: 1160,
      xl: 1920,
    },
  },

  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif, -apple-system',
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
      light: 'rgba(44, 104, 214, 0.6)',
      main: 'rgb(44, 104, 214)',
      dark: 'rgb(24, 84, 194)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(244, 67, 54, 0.6)',
      main: 'rgb(244, 67, 54)',
      dark: 'rgb(247, 55, 41)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(52, 55, 76, 0.98)',
      secondary: 'rgba(52, 55, 76, 0.7)',
      disabled: 'rgba(52, 55, 76, 0.55)',
      hint: 'rgba(52, 55, 76, 0.5)',
    },
    divider: '#EDEFF3',
    grey: {
      50: '#fafafa',
      100: '#F9F9F9',
      200: '#EDEFF3',
      300: '#e0e0e0',
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
  MuiInputAdornment: MuiInputAdornment(theme),
  MuiInputBase: MuiInputBase(theme),
  MuiInputLabel: MuiInputLabel(theme),
  MuiOutlinedInput: MuiOutlinedInput(theme),
  MuiSelect: MuiSelect(theme),
  MuiTab: MuiTab(theme),
  MuiTabs: MuiTabs(theme),
  MuiToolbar: MuiToolbar(theme),
  MuiTypography: MuiTypography(theme),
};

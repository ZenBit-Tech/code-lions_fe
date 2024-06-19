import { createTheme, ThemeOptions } from '@mui/material/styles';

import ExpandMoreIcon from 'src/components/shared/StyledSelect/ExpandMoreIcon';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      primary: string;
      secondary: string;
      dark: string;
      grey: string;
      light: string;
      error: string;
    };
  }

  interface PaletteOptions {
    border?: {
      primary?: string;
      secondary?: string;
      dark?: string;
      grey?: string;
      light: string;
      error?: string;
    };
  }
}

const defaultTheme = createTheme();
const shadows: ThemeOptions['shadows'] = [...defaultTheme.shadows];

shadows[1] =
  '0 -8px 20px 0 rgba(244, 244, 244, 0.25), 0 2px 2px 0 rgba(160, 168, 176, 0.08)';

const theme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#333333',
      light: '#EDEAE9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E3EEE2',
      light: '#F6F4F4',
      contrastText: '#333333',
    },
    grey: {
      800: '#141519',
      900: '#1C1C1E',
    },
    background: {
      default: '#ffffff',
      paper: '#EDEAE9',
    },
    text: {
      primary: '#333333',
      secondary: '#9491A1',
      disabled: '#6D6B6B',
    },
    border: {
      primary: 'rgba(0, 0, 0, 0.24)',
      secondary: '#EDEAE9',
      dark: '#333333',
      grey: '#D1D5DB',
      light: '#cbcbcb',
      error: '#F7392E',
    },
    action: {
      hoverOpacity: 0.3,
    },
  },
  typography: {
    fontFamily: 'DM Sans, Arial, sans-serif',
    fontSize: 16,
    fontWeightRegular: 400,
    h1: {
      fontFamily: 'Playfair Display, Arial, sans-serif',
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.32,
      letterSpacing: '-0.28px',
    },
    h2: {
      fontFamily: 'Playfair Display, Arial, sans-serif',
      fontSize: 31.22,
      fontWeight: 600,
      lineHeight: 1.85,
      letterSpacing: '-0.31px',
    },
    h3: {
      fontFamily: 'Playfair Display, Arial, sans-serif',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 'normal',
      '@media (min-width:600px)': {
        fontSize: 24,
        lineHeight: 1.83,
        letterSpacing: '-0.4px',
      },
    },
    h4: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '-0.21px',
    },
    h5: {
      fontFamily: 'Playfair Display, Arial, sans-serif',
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.85,
      letterSpacing: '-0.2px',
      '@media (min-width:600px)': {
        fontSize: 40,
        fontWeight: 500,
        lineHeight: 1.45,
        letterSpacing: '-1px',
      },
    },
    subtitle1: {
      fontFamily: 'Playfair Display, Arial, sans-serif',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.43,
      letterSpacing: '-0.21px',
    },
    subtitle2: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.43,
    },
    body1: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: '-0.24px',
    },
    body2: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.43,
      '@media (min-width:600px)': {
        fontSize: 16,
        lineHeight: 1.63,
      },
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      color: 'black',
    },
    button: {
      fontFamily: 'Playfair Display, Arial, sans-serif',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '-0.5px',
      textTransform: 'none',
      lineHeight: 1.32,
    },
    overline: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 1.33,
      letterSpacing: '-0.06px',
      textTransform: 'none',
    },
  },
  shadows,

  components: {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreIcon,
      },
    },
  },
});

export default theme;

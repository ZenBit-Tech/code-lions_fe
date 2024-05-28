import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      primary: string;
      secondary: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    border?: {
      primary?: string;
      secondary?: string;
      dark?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: 'ffffff',
    },
    primary: {
      main: '#333333',
      light: '#EDEAE9',
      contrastText: 'ffffff',
    },
    secondary: {
      main: '#E3EEE2',
    },
    background: {
      default: 'ffffff',
      paper: '#EDEAE9',
    },
    text: {
      primary: '#333333',
      secondary: '#ffffff',
      disabled: '#6D6B6B',
    },
    border: {
      primary: 'rgba(0, 0, 0, 0.24)',
      secondary: '#EDEAE9',
      dark: '#333333',
    },
    action: {
      hoverOpacity: 0.8,
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
      '@media (min-width:1440px)': {
        fontSize: 28,
      },
    },
    h4: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 14,
      fontWeightRegular: 500,
      lineHeight: 1.43,
      letterSpacing: '-0.21px',
    },
    subtitle1: {
      fontFamily: 'Playfair Display, Arial, sans-serif',
      fontSize: 14,
      fontWeightRegular: 600,
      lineHeight: 1.43,
      letterSpacing: '-0.21px',
    },
    subtitle2: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 14,
      fontWeightRegular: 400,
      lineHeight: 1.43,
    },
    body1: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: '-0.24px',
    },
    button: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '-0.5px',
      textTransform: 'none',
    },
  },
});

export default theme;

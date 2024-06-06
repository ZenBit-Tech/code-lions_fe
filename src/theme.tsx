import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      primary: string;
      secondary: string;
      dark: string;
      error: string;
    };
  }

  interface PaletteOptions {
    border?: {
      primary?: string;
      secondary?: string;
      dark?: string;
      error?: string;
    };
  }
}

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
      contrastText: '#333333',
    },
    background: {
      default: '#ffffff',
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
    },
    h4: {
      fontFamily: 'DM Sans, Arial, sans-serif',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '-0.21px',
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
});

export default theme;

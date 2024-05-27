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
  },
});

export default theme;

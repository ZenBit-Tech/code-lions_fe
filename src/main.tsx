import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import i18n from './locales/i18n';
import './index.css';
import App from './App';
import store from './redux/store';
import theme from './theme';
import ToastProvider from './components/shared/toasts/components/ToastProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

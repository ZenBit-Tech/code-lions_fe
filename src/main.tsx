import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@mui/material/styles';

import GoogleAuthProvider from 'src/components/GoogleAuthProvider';
import ToastProvider from 'src/components/shared/toasts/components/ToastProvider';
import i18n from 'src/locales/i18n';
import store, { persistor } from 'src/redux/store';

import App from './App';
import './index.css';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <GoogleAuthProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </GoogleAuthProvider>
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

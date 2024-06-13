import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';

import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'src/redux/store';

import App from './App';
import ToastProvider from './components/shared/toasts/components/ToastProvider';
import i18n from './locales/i18n';
import './index.css';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import store, { persistor } from 'src/redux/store';
import i18n from './locales/i18n';
import './index.css';
import App from './App';
import theme from './theme';
import ToastProvider from './components/shared/toasts/components/ToastProvider';
import GoogleAuthProvider from './components/GoogleAuthProvider';

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

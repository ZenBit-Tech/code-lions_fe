import { render, screen } from '@testing-library/react';

import { act } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@mui/material/styles';

import GoogleAuthProvider from 'src/components/GoogleAuthProvider';
import ToastProvider from 'src/components/shared/toasts/components/ToastProvider';
import i18n from 'src/locales/i18n';
import store, { persistor } from 'src/redux/store';
import theme from 'src/theme';

import App from './App';

test('renders App component, show Log in and Sign Up buttons', async () => {
  await act(async () => {
    render(
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
    );
  });

  expect(screen.getByText('Log in')).toBeInTheDocument();
  const signUpButtons = screen.queryAllByText('Sign Up');

  expect(signUpButtons.length).toBeGreaterThan(0);
});

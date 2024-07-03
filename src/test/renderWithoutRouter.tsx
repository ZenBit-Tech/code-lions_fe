import { render, RenderOptions } from '@testing-library/react';

import { ReactElement, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@mui/material/styles';

import GoogleAuthProvider from 'src/components/GoogleAuthProvider';
import ToastProvider from 'src/components/shared/toasts/components/ToastProvider';
import i18n from 'src/locales/i18n';
import store, { persistor } from 'src/redux/store';
import theme from 'src/theme';

type Props = {
  children: ReactNode;
};

function AllTheProviders({ children }: Props): ReactElement {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <GoogleAuthProvider>
              <ToastProvider>{children}</ToastProvider>
            </GoogleAuthProvider>
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

const renderWithoutRouter = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export default renderWithoutRouter;

import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'src/pages/HomePage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import VerifyPrivateRoute from './VerifyPrivateRoute';

const router = createBrowserRouter([
  { path: '', element: <HomePage /> },
  { path: 'signup', element: <SignUpPage /> },
  {
    path: 'verify',
    element: (
      <VerifyPrivateRoute>
        <VerifyEmailPage />
      </VerifyPrivateRoute>
    ),
  },
  { path: 'signin', element: <SignInPage /> },
  { path: 'restore-password', element: <RestorePasswordPage /> },
  { path: 'enter-code', element: <VerifyEmailPage /> },
  { path: 'new-password', element: <NewPasswordPage /> },
]);

export default router;

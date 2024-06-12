import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'src/pages/HomePage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import TermsOfUsePage from 'src/pages/TermsOfUsePage';
import PrivacyPolicyPage from 'src/pages/PrivacyPolicyPage';
import SignInAdminPage from 'src/pages/SignInAdminPage';
import { urls } from 'src/common/constants';
import VerifyPrivateRoute from './VerifyPrivateRoute';

const router = createBrowserRouter([
  { path: urls.HOME, element: <HomePage /> },
  { path: urls.SIGN_UP, element: <SignUpPage /> },
  {
    path: urls.VERIFY,
    element: (
      <VerifyPrivateRoute>
        <VerifyEmailPage />
      </VerifyPrivateRoute>
    ),
  },
  { path: urls.SIGN_IN, element: <SignInPage /> },
  { path: urls.RESTORE_PASSWORD, element: <RestorePasswordPage /> },
  { path: urls.ENTER_CODE, element: <VerifyEmailPage /> },
  { path: urls.NEW_PASSWORD, element: <NewPasswordPage /> },
  { path: urls.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
  { path: urls.TERMS_OF_USE, element: <TermsOfUsePage /> },
  { path: urls.SIGN_IN_ADMIN, element: <SignInAdminPage /> },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'src/pages/HomePage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import PrivacyPolicyPage from 'src/pages/PrivacyPolicyPage';
import TermsOfUsePage from 'src/pages/TermsOfUsePage';
import { urls } from 'src/common/constants';

const router = createBrowserRouter([
  { path: urls.HOME, element: <HomePage /> },
  { path: urls.SIGN_UP, element: <SignUpPage /> },
  { path: urls.VERIFY, element: <VerifyEmailPage /> },
  { path: urls.SIGN_IN, element: <SignInPage /> },
  { path: urls.RESTORE_PASSWORD, element: <RestorePasswordPage /> },
  { path: urls.ENTER_CODE, element: <VerifyEmailPage /> },
  { path: urls.NEW_PASSWORD, element: <NewPasswordPage /> },
  { path: urls.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
  { path: urls.TERMS_OF_USE, element: <TermsOfUsePage /> },
]);

export default router;

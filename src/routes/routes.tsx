import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'src/pages/HomePage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import TermsOfUsePage from "src/pages/TermsOfUsePage";
import PrivacyPolicyPage from "src/pages/PrivacyPolicyPage";
import { urls } from "src/common/constants";

const router = createBrowserRouter([
  { path: '', element: <HomePage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'verify', element: <VerifyEmailPage /> },
  { path: 'signin', element: <SignInPage /> },
  { path: 'restore-password', element: <RestorePasswordPage /> },
  { path: 'enter-code', element: <VerifyEmailPage /> },
  { path: 'new-password', element: <NewPasswordPage /> },
  { path: 'home', element: <HomePage /> },
  { path: urls.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
  { path: urls.TERMS_OF_USE, element: <TermsOfUsePage /> },
]);

export default router;

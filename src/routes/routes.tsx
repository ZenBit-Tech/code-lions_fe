import { createBrowserRouter } from 'react-router-dom';

import { urls } from 'src/common/constants';
import AdminUserProfileEditPage from 'src/pages/AdminUserProfileEditPage';
import AdminUserProfilePage from 'src/pages/AdminUserProfilePage';
import HomePage from 'src/pages/HomePage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import OnboardingPage from 'src/pages/OnboardingPage';
import PrivacyPolicyPage from 'src/pages/PrivacyPolicyPage';
import ProfilePage from 'src/pages/ProfilePage';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import SignInAdminPage from 'src/pages/SignInAdminPage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import SizesGuidePage from 'src/pages/SizesGuidePage';
import TermsOfUsePage from 'src/pages/TermsOfUsePage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';

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
  { path: urls.SIZES_GUIDE, element: <SizesGuidePage /> },
  { path: urls.SIGN_IN_ADMIN, element: <SignInAdminPage /> },
  { path: urls.ONBOARDING, element: <OnboardingPage /> },
  { path: urls.PROFILE, element: <ProfilePage /> },
  { path: urls.ADMIN_USER_PROFILE, element: <AdminUserProfilePage /> },
  { path: urls.ADMIN_USER_PROFILE_EDIT, element: <AdminUserProfileEditPage /> },
]);

export default router;

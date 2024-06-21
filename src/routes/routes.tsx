import { createBrowserRouter } from 'react-router-dom';

import { urls } from 'src/common/constants';
import AdminLayout from 'src/pages/admin/AdminLayout';
import AdminUserProfileEditPage from 'src/pages/admin/AdminUserProfileEditPage';
import AdminUserProfilePage from 'src/pages/admin/AdminUserProfilePage';
import SignInAdminPage from 'src/pages/admin/SignInAdminPage';
import UsersPage from 'src/pages/admin/UsersPage';
import HomePage from 'src/pages/HomePage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import OnboardingPage from 'src/pages/OnboardingPage';
import PrivacyPolicyPage from 'src/pages/PrivacyPolicyPage';
import ProfilePage from 'src/pages/ProfilePage';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import SizesGuidePage from 'src/pages/SizesGuidePage';
import TermsOfUsePage from 'src/pages/TermsOfUsePage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';

import AdminPrivateRoute from './AdminPrivateRoute';
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
  {
    path: urls.ADMIN,
    element: (
      <AdminPrivateRoute>
        <AdminLayout />
      </AdminPrivateRoute>
    ),

    children: [
      {
        path: urls.ADMIN_USERS,
        element: <UsersPage />,
      },
      {
        path: urls.ADMIN_USER_PROFILE,
        element: <AdminUserProfilePage />,
      },
      {
        path: urls.ADMIN_USER_PROFILE_EDIT,
        element: <AdminUserProfileEditPage />,
      },
      {
        path: urls.ADMIN_BUYERS,
        element: <UsersPage />,
      },
      {
        path: urls.ADMIN_BUYER_PROFILE,
        element: <AdminUserProfilePage />,
      },
      {
        path: urls.ADMIN_BUYER_PROFILE_EDIT,
        element: <AdminUserProfileEditPage />,
      },
      {
        path: urls.ADMIN_VENDORS,
        element: <UsersPage />,
      },
      {
        path: urls.ADMIN_VENDOR_PROFILE,
        element: <AdminUserProfilePage />,
      },
      {
        path: urls.ADMIN_VENDOR_PROFILE_EDIT,
        element: <AdminUserProfileEditPage />,
      },
    ],
  },
  { path: urls.ONBOARDING, element: <OnboardingPage /> },
  { path: urls.PROFILE, element: <ProfilePage /> },
]);

export default router;

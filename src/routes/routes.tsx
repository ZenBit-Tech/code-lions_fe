import { createBrowserRouter } from 'react-router-dom';

import { urls } from 'src/common/constants';
import Layout from 'src/components/Layout';
import AdminLayout from 'src/pages/admin/AdminLayout';
import AdminUserProfileEditPage from 'src/pages/admin/AdminUserProfileEditPage';
import AdminUserProfilePage from 'src/pages/admin/AdminUserProfilePage';
import SignInAdminPage from 'src/pages/admin/SignInAdminPage';
import UsersPage from 'src/pages/admin/UsersPage';
import BuyerProfilePage from 'src/pages/BuyerProfilePage';
import HomePage from 'src/pages/HomePage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import OnboardingPage from 'src/pages/OnboardingPage';
import PrivacyPolicyPage from 'src/pages/PrivacyPolicyPage';
import ProfileLayout from 'src/pages/ProfileLayout';
import ProfilePage from 'src/pages/ProfilePage';
import ProfileComingSoon from 'src/pages/ProfilePage/ProfileComingSoon';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import SizesGuidePage from 'src/pages/SizesGuidePage';
import TermsOfUsePage from 'src/pages/TermsOfUsePage';
import VendorLayout from 'src/pages/vendor/VendorLayout';
import VendorProfilePage from 'src/pages/VendorProfilePage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';

import AdminPrivateRoute from './AdminPrivateRoute';
import OnboardingGuard from './OnboardingGuard';
import VerifyPrivateRoute from './VerifyPrivateRoute';

const router = createBrowserRouter([
  {
    path: urls.HOME,
    element: <OnboardingGuard element={<Layout />} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: urls.SIZES_GUIDE, element: <SizesGuidePage /> },
      { path: urls.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
      { path: urls.TERMS_OF_USE, element: <TermsOfUsePage /> },
      {
        path: urls.PROFILE,
        element: <ProfileLayout />,
        children: [
          { path: urls.PROFILE_DETAILS, element: <ProfilePage /> },
          { path: urls.PROFILE_ORDERS, element: <ProfileComingSoon /> },
          { path: urls.PROFILE_WISHLIST, element: <ProfileComingSoon /> },
          { path: urls.PROFILE_SETTINGS, element: <ProfileComingSoon /> },
          { path: urls.PROFILE_SUPPORT, element: <ProfileComingSoon /> },
        ],
      },
    ],
  },
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
  { path: urls.USER_VENDOR_PROFILE, element: <VendorProfilePage /> },
  {
    path: urls.VENDOR,
    element: <VendorLayout />,
    children: [
      { path: urls.USER_BUYER_PROFILE, element: <BuyerProfilePage /> },
      { path: urls.VENDOR_DASHBOARD, element: <ProfileComingSoon /> },
      { path: urls.VENDOR_ADD_PRODUCT, element: <ProfileComingSoon /> },
      { path: urls.VENDOR_PRODUCTS, element: <ProfileComingSoon /> },
      { path: urls.VENDOR_ORDERS, element: <ProfileComingSoon /> },
      { path: urls.VENDOR_CHATS, element: <ProfileComingSoon /> },
      {
        path: urls.VENDOR_PROFILE,
        element: <ProfileLayout />,
        children: [
          { path: urls.PROFILE_DETAILS, element: <ProfileComingSoon /> },
          { path: urls.PROFILE_SETTINGS, element: <ProfileComingSoon /> },
          { path: urls.PROFILE_SUPPORT, element: <ProfileComingSoon /> },
        ],
      },
    ],
  },
]);

export default router;

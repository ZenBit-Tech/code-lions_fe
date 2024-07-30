import { createBrowserRouter } from 'react-router-dom';

import { urls } from 'src/common/constants';
import Layout from 'src/components/Layout';
import AboutUsPage from 'src/pages/AboutUsPage';
import AdminLayout from 'src/pages/admin/AdminLayout';
import AdminUserProfileEditPage from 'src/pages/admin/AdminUserProfileEditPage';
import AdminUserProfilePage from 'src/pages/admin/AdminUserProfilePage';
import ProductListPage from 'src/pages/admin/ProductListPage';
import ProductRequestPage from 'src/pages/admin/ProductRequestPage';
import SignInAdminPage from 'src/pages/admin/SignInAdminPage';
import UsersPage from 'src/pages/admin/UsersPage';
import BestVendorsPage from 'src/pages/BestVendorsPage';
import BuyerPublicProfilePage from 'src/pages/BuyerPublicProfilePage';
import CartPage from 'src/pages/CartPage';
import ChatsPage from 'src/pages/Chats';
import CheckoutPage from 'src/pages/CheckoutPage';
import CompanyPage from 'src/pages/CompanyPage';
import ContactPage from 'src/pages/ContactPage';
import FaqPage from 'src/pages/FaqPage';
import HelpPage from 'src/pages/HelpPage';
import HomePage from 'src/pages/HomePage';
import NewPasswordPage from 'src/pages/NewPasswordPage';
import NotFoundPage from 'src/pages/NotFoundPage';
import OnboardingPage from 'src/pages/OnboardingPage';
import PrivacyPolicyPage from 'src/pages/PrivacyPolicyPage';
import ProductFeedPage from 'src/pages/ProductFeedPage';
import ProductPage from 'src/pages/ProductPage';
import ProfileLayout from 'src/pages/ProfileLayout';
import ProfileOrders from 'src/pages/ProfileOrders';
import ProfilePage from 'src/pages/ProfilePage';
import ProfileComingSoon from 'src/pages/ProfilePage/ProfileComingSoon';
import RentalRulesPage from 'src/pages/RentalRulesPage';
import RentPage from 'src/pages/RentPage';
import RestorePasswordPage from 'src/pages/RestorePasswordPage';
import ShippingPage from 'src/pages/ShippingPage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import SizesGuidePage from 'src/pages/SizesGuidePage';
import SupportPage from 'src/pages/SupportPage';
import TermsOfUsePage from 'src/pages/TermsOfUsePage';
import VendorAddProductPage from 'src/pages/vendor/VendorAddProductPage';
import VendorDashboard from 'src/pages/vendor/VendorDashboard';
import VendorLayout from 'src/pages/vendor/VendorLayout';
import VendorOrderPage from 'src/pages/vendor/VendorOrderPage';
import VendorOrdersPage from 'src/pages/vendor/VendorOrdersPage';
import VendorProductPage from 'src/pages/vendor/VendorProductPage';
import VendorProductsPage from 'src/pages/vendor/VendorProductsPage';
import VendorProfileLayout from 'src/pages/vendor/VendorProfileLayout';
import VendorProfilePage from 'src/pages/vendor/VendorProfilePage';
import VendorPublicProfilePage from 'src/pages/vendor/VendorPublicProfilePage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';
import WishlistPage from 'src/pages/WishlistPage';

import AdminPrivateRoute from './AdminPrivateRoute';
import FinishedOnboardingGuard from './FinishedOnboardingGuard';
import OnboardingGuard from './OnboardingGuard';
import VendorPrivateRoute from './VendorPrivateRoute';
import VerifyPrivateRoute from './VerifyPrivateRoute';

const router = createBrowserRouter([
  {
    path: urls.HOME,
    element: <OnboardingGuard element={<Layout />} />,
    children: [
      {
        index: true,
        element: (
          <VendorPrivateRoute>
            <HomePage />
          </VendorPrivateRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
      { path: urls.PRODUCT_FEED, element: <ProductFeedPage /> },
      { path: urls.PRODUCT_CATEGORY, element: <ProductFeedPage /> },
      { path: urls.PRODUCT, element: <ProductPage /> },
      { path: urls.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
      { path: urls.HOW_IT_WORKS, element: <RentalRulesPage /> },
      { path: urls.ABOUT_US, element: <AboutUsPage /> },
      { path: urls.COMPANY, element: <CompanyPage /> },
      { path: urls.CONTACT, element: <ContactPage /> },
      { path: urls.FAQ, element: <FaqPage /> },
      { path: urls.SHIPPING, element: <ShippingPage /> },
      { path: urls.RENT, element: <RentPage /> },
      { path: urls.HELP, element: <HelpPage /> },
      { path: urls.TERMS_OF_USE, element: <TermsOfUsePage /> },
      { path: urls.BEST_VENDORS, element: <BestVendorsPage /> },
      {
        path: urls.PROFILE,
        element: <ProfileLayout />,
        children: [
          { path: urls.PROFILE_DETAILS, element: <ProfilePage /> },
          { path: urls.PROFILE_ORDERS, element: <ProfileOrders /> },
          { path: urls.PROFILE_WISHLIST, element: <WishlistPage /> },
          { path: urls.BUYER_CHATS, element: <ChatsPage /> },
          { path: urls.BUYER_CHAT_ID, element: <ChatsPage /> },
          { path: urls.PROFILE_SETTINGS, element: <ProfileComingSoon /> },
          { path: urls.PROFILE_SUPPORT, element: <SupportPage /> },
          { path: urls.PROFILE_SUPPORT_ID, element: <SupportPage /> },
        ],
      },
      { path: urls.CART, element: <CartPage /> },
      { path: urls.CHECKOUT, element: <CheckoutPage /> },
    ],
  },
  {
    path: urls.SIZES_GUIDE,
    element: <Layout />,
    children: [{ index: true, element: <SizesGuidePage /> }],
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

      {
        path: urls.ADMIN_PRODUCT_REQUEST,
        element: <ProductRequestPage />,
      },
      {
        path: urls.ADMIN_PRODUCT_LIST,
        element: <ProductListPage />,
      },
      {
        path: urls.ADMIN_CHATS,
        element: <ChatsPage />,
      },
      {
        path: urls.ADMIN_CHAT_ID,
        element: <ChatsPage />,
      },
    ],
  },
  {
    path: urls.ONBOARDING,
    element: <FinishedOnboardingGuard element={<OnboardingPage />} />,
  },
  { path: urls.PROFILE, element: <ProfilePage /> },
  { path: urls.USER_VENDOR_PROFILE, element: <VendorPublicProfilePage /> },
  {
    path: urls.VENDOR,
    element: <VendorLayout />,
    children: [
      { path: urls.USER_BUYER_PROFILE, element: <BuyerPublicProfilePage /> },
      { path: urls.VENDOR_DASHBOARD, element: <VendorDashboard /> },
      { path: urls.VENDOR_ADD_PRODUCT, element: <VendorAddProductPage /> },
      { path: urls.VENDOR_EDIT_PRODUCT, element: <ProfileComingSoon /> },
      { path: urls.VENDOR_PRODUCTS, element: <VendorProductsPage /> },
      { path: urls.VENDOR_ORDERS, element: <VendorOrdersPage /> },
      { path: urls.VENDOR_ORDER, element: <VendorOrderPage /> },
      { path: urls.VENDOR_CHATS, element: <ChatsPage /> },
      { path: urls.VENDOR_CHAT_ID, element: <ChatsPage /> },
      {
        path: urls.VENDOR_PROFILE,
        element: <VendorProfileLayout />,
        children: [
          { path: urls.PROFILE_DETAILS, element: <VendorProfilePage /> },
          { path: urls.PROFILE_SETTINGS, element: <ProfileComingSoon /> },
          { path: urls.PROFILE_SUPPORT, element: <SupportPage /> },
          { path: urls.PROFILE_SUPPORT_ID, element: <SupportPage /> },
        ],
      },
    ],
  },
  { path: urls.PUBLIC_PRODUCT_ID, element: <VendorProductPage /> },
]);

export default router;

import { SortOrder } from 'src/redux/user/types';

export const urls = {
  HOME: '/',
  SIGN_UP: '/signup',
  VERIFY: '/verify',
  SIGN_IN: '/signin',
  RESTORE_PASSWORD: '/restore-password',
  ENTER_CODE: '/enter-code',
  NEW_PASSWORD: '/new-password',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',
  SIZES_GUIDE: '/sizes-guide',
  SIGN_IN_ADMIN: 'admin/signin',
  ADMIN: '/admin',
  ONBOARDING: '/onboarding',
  ADMIN_USERS: 'users',
  ADMIN_USER_PROFILE: 'users/:userId',
  ADMIN_USER_PROFILE_EDIT: 'users/edit/:userId',
  ADMIN_BUYERS: 'buyers',
  ADMIN_BUYER_PROFILE: 'buyers/:userId',
  ADMIN_BUYER_PROFILE_EDIT: 'buyers/edit/:userId',
  ADMIN_VENDORS: 'vendors',
  ADMIN_VENDOR_PROFILE: 'vendors/:userId',
  ADMIN_VENDOR_PROFILE_EDIT: 'vendors/edit/:userId',
  ADMIN_USERS_FULL: '/admin/users',
  PROFILE: '/profile',
};

export const RTKUrls = {
  VERIFY_OTP: 'auth/verify-otp',
  RESEND_OTP: 'auth/resend-otp',
  SIGN_IN: 'auth/login',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  NEW_PASSWORD: 'auth/new-password',
  REGISTER_USER: 'auth/register',
  GOOGLE_AUTH: 'auth/google',
  ADMIN_USERS: 'users/admin',
  USERS: 'users',
  UPDATE_PROFILE_ADMIN: 'update-profile-admin',
  SOFT_DELETE: 'soft-delete',
};

export const HttpMethods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const validations = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD_MIN_LENGTH: 8,
};

export const appErrors = {
  FAILED_TO_VERIFY: 'Failed to verify email',
  FAILED_TO_RESEND_OTP: 'Failed to resend otp code',
  FAILED_SIGN_IN: 'Failed to sign in',
  FAILED_TO_SEND_EMAIL: 'Email are not send due to unexpected error',
  MISSING_CREDENTIALS: 'Missing credentials',
  EMAIL_INCORRECT: 'Please enter valid email',
  PASSWORD_LENGTH: 'Password needs to be at least 8 characters',
  PASSWORD_MATCH:
    'Passwords entered in the "Password" and "Repeat password" fields must match',
};

export const pathToPhotos = '/assets/photos';

export const socialNetworkLinks = {
  FACEBOOK: 'https://www.facebook.com/',
  INSTAGRAM: 'https://www.instagram.com/',
  EMAIL: 'mailto:codelions@helpseo.net',
};

export const onboardingSteps = {
  ROLE: 1,
  INFO: 2,
  ADDRESS: 3,
  CARD: 4,
  SIZES: 5,
  FINISH: 6,
};

export const countryCodes = [
  { code: '+62' },
  { code: '+38' },
  { code: '+1' },
  { code: '' },
];

export const userRoles = {
  BUYER: 'buyer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};

export const linkUrls = {
  ADMIN_USER_PROFILE_EDIT: 'edit',
};

export const sortOptions: Record<string, SortOrder> = {
  DESC: 'desc',
  ASC: 'asc',
};

export const countries = [{ label: 'Canada', value: 'Canada' }];

export const states = [
  { label: 'Ontario', value: 'Ontario' },
  { label: 'Quebec', value: 'Quebec' },
  { label: 'Nova Scotia', value: 'Nova Scotia' },
  { label: 'New Brunswick', value: 'New Brunswick' },
  { label: 'Manitoba', value: 'Manitoba' },
  { label: 'British Columbia', value: 'British Columbia' },
  { label: 'Alberta', value: 'Alberta' },
  { label: 'Saskatchewan', value: 'Saskatchewan' },
  { label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador' },
  { label: 'Prince Edward Island', value: 'Prince Edward Island' },
];

export const cities = [
  { label: 'Toronto', value: 'Toronto' },
  { label: 'Montreal', value: 'Montreal' },
  { label: 'Vancouver', value: 'Vancouver' },
  { label: 'Fredericton', value: 'Fredericton' },
  { label: 'Charlottetown', value: 'Charlottetown' },
  { label: "St. John's", value: "St. John's" },
  { label: 'Regina', value: 'Regina' },
  { label: 'Calgary', value: 'Calgary' },
  { label: 'Saskatoon', value: 'Saskatoon' },
  { label: 'Halifax', value: 'Halifax' },
];

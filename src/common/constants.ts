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
  REFRESH_TOKEN: 'auth/refresh-token',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  NEW_PASSWORD: 'auth/new-password',
  REGISTER_USER: 'auth/register',
  GOOGLE_AUTH: 'auth/google',
  ADMIN_USERS: 'users/admin',
  USERS: 'users',
  ROLE: 'role',
  PHOTO: 'photo',
  PHONE: 'phone',
  ADDRESS: 'address',
  SIZE: 'size',
  CREDIT_CARD: 'credit-card',
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
  PHONE_REGEX: /^[1-9][0-9]{0,10}$/,
  PHONE_LENGTH: 11,
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
  INVALID_PHONE: 'Phone number should be in format 12345678901',
  INVALID_LENGTH: 'Invalid length, should be 11',
  REQUIRED: 'Field is required',
  TOO_LONG: 'Too long, should be less than 100 characters',
  INVALID_CARD_NUMBER: 'Invalid card number, should be 16 digits',
  INVALID_EXPIRE_DATE:
    'Invalid expire date, should be in format MM/YY in the future',
  INVALID_CVV: 'Invalid CVV, should be 3 digits',
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

export const countryCodes = [{ code: '+62' }, { code: '+38' }];

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

export const httpStatusCodes = {
  UNAUTHORIZED: 401,
};

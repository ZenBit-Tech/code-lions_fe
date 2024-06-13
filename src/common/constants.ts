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
  SIGN_IN_ADMIN: '/signin-admin',
};

export const RTKUrls = {
  VERIFY_OTP: 'auth/verify-otp',
  RESEND_OTP: 'auth/resend-otp',
  SIGN_IN: 'auth/login',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  REGISTER_USER: 'auth/register',
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
};

export const pathToPhotos = '/assets/photos';

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
  SIGN_IN_ADMIN: '/signin-admin',
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

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
};

export const RTKUrls = {
  REGISTER_USER: 'auth/register',
  VERIFY_OTP: 'auth/verify-otp',
  RESEND_OTP: 'auth/resend-otp',
};

export const HttpMethods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const appErrors = {
  FAILED_TO_VERIFY: 'Failed to verify email',
  FAILED_TO_RESEND_OTP: 'Failed to resend otp code',
};
export const validations = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD_MIN_LENGTH: 8,
};

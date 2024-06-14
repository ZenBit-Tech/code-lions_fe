import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { GoogleLogin } from '@react-oauth/google';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { urls } from 'src/common/constants';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAddUserGoogleMutation } from 'src/redux/user/userService';

const GoogleButtonProps = {
  WIDTH_SMALL: '300px',
  WIDTH_BIG: '335px',
  LOCALE: 'en',
  SIGN_UP: 'signup_with',
  SIGN_IN: 'signin_with',
  CENTER: 'center',
} as const;

type GoogleButtonText =
  | typeof GoogleButtonProps.SIGN_UP
  | typeof GoogleButtonProps.SIGN_IN;

interface IGoogleLoginButtonProps {
  width?: string;
  text?: GoogleButtonText;
  locale?: string;
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === 'object' && error != null && 'message' in error;
}

function GoogleLoginButton({
  width = GoogleButtonProps.WIDTH_BIG,
  text,
  locale = GoogleButtonProps.LOCALE,
}: IGoogleLoginButtonProps) {
  const { t } = useTranslation();
  const [addUser] = useAddUserGoogleMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const adjustedWidth = isSmallScreen ? GoogleButtonProps.WIDTH_SMALL : width;
  const { showToast } = useToast();

  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if (
      'data' in error &&
      error.data &&
      (error.data as { message?: string }).message
    ) {
      return (error.data as { message: string }).message;
    }

    return t('authErrors.failed');
  };

  return (
    <GoogleLogin
      logo_alignment={GoogleButtonProps.CENTER}
      width={adjustedWidth}
      text={text}
      locale={locale}
      onSuccess={async (credentialResponse) => {
        try {
          const response = await addUser({
            token: credentialResponse.credential,
          }).unwrap();

          if (response) {
            const { isEmailVerified } = response;

            if (isEmailVerified) {
              navigate(urls.HOME);
            } else {
              navigate(urls.VERIFY);
            }
          }
        } catch (err) {
          if (isFetchBaseQueryError(err) || isSerializedError(err)) {
            showToast('error', getErrorMessage(err));
          } else {
            showToast('error', t('authErrors.failed'));
          }
        }
      }}
      onError={() => {
        showToast('error', t('authErrors.googleLoginFailed'));
      }}
    />
  );
}

export default GoogleLoginButton;

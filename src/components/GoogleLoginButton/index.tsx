import { GoogleLogin } from '@react-oauth/google';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAddUserGoogleMutation } from 'src/redux/user/userService';
import { useNavigate } from 'react-router-dom';
import { urls } from 'src/common/constants';

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

function GoogleLoginButton({
  width = GoogleButtonProps.WIDTH_BIG,
  text,
  locale = GoogleButtonProps.LOCALE,
}: IGoogleLoginButtonProps) {
  const [addUser] = useAddUserGoogleMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const adjustedWidth = isSmallScreen ? GoogleButtonProps.WIDTH_SMALL : width;

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
          });

          if (response && response.data) {
            const { isEmailVerified } = response.data;

            if (isEmailVerified) {
              navigate(urls.HOME);
            } else {
              navigate(urls.VERIFY);
            }
          } else {
            console.error('Response data is undefined');
          }
        } catch (err) {
          alert(err);
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default GoogleLoginButton;

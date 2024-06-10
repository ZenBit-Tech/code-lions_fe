import { GoogleLogin } from '@react-oauth/google';
import { useAddUserGoogleMutation } from 'src/redux/user/userService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/redux/auth/hooks/hooks';
import { setUser, setVerifiedUser } from 'src/redux/user/userSlice';
import { urls } from 'src/common/constants';

interface IGoogleLoginButtonProps {
  width?: string;
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' | undefined;
  locale?: string;
}

function GoogleLoginButton({
  width = '335px',
  text,
  locale = 'en',
}: IGoogleLoginButtonProps) {
  const [addUser] = useAddUserGoogleMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <GoogleLogin
      width={width}
      text={text}
      locale={locale}
      onSuccess={async (credentialResponse) => {
        try {
          console.log(credentialResponse);
          const response = await addUser({
            token: credentialResponse.credential,
          });

          if (response && response.data) {
            const { isEmailVerified } = response.data;

            if (isEmailVerified) {
              dispatch(setUser(response.data));
              navigate(urls.HOME);
            } else {
              dispatch(setVerifiedUser(response.data));
              navigate(urls.VERIFY);
            }

            console.log(response);
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

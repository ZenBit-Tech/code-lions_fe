import { useLocation } from 'react-router-dom';
import theme from 'src/theme';

const imageUrls = {
  signupImageUrl: 'src/assets/photos/signUpPhoto.jpeg',
  verifyImageUrl: 'src/assets/photos/verifyPhoto.jpeg',
  signinImageUrl: 'src/assets/photos/signInPhoto.png',
  restoreImageUrl: 'src/assets/photos/restorePasswordPhoto.jpg',
};

const locations = {
  signup: '/signup',
  verify: '/verify',
  signin: '/signin',
  restorePassword: '/restore-password',
  auth: '/auth',
};

const RouteConfig: {
  [key: string]: { backgroundImage: string; logoColor: string };
} = {
  [locations.signup]: {
    backgroundImage: imageUrls.signupImageUrl,
    logoColor: theme.palette.common.black,
  },
  [locations.verify]: {
    backgroundImage: imageUrls.verifyImageUrl,
    logoColor: theme.palette.common.white,
  },
  [locations.signin]: {
    backgroundImage: imageUrls.signinImageUrl,
    logoColor: theme.palette.common.black,
  },
  [locations.restorePassword]: {
    backgroundImage: imageUrls.restoreImageUrl,
    logoColor: theme.palette.common.black,
  },
  [locations.auth]: {
    backgroundImage: imageUrls.verifyImageUrl,
    logoColor: theme.palette.common.white,
  },
};

const useRoute = () => {
  const location = useLocation();
  return RouteConfig[location.pathname];
};

export default useRoute;

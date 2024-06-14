import { useLocation } from 'react-router-dom';

import { pathToPhotos, urls } from 'src/common/constants';
import theme from 'src/theme';

const imageUrls = {
  signupImageUrl: `${pathToPhotos}/signUpPhoto.jpeg`,
  verifyImageUrl: `${pathToPhotos}/verifyPhoto.jpeg`,
  signinImageUrl: `${pathToPhotos}/signInPhoto.png`,
  restoreImageUrl: `${pathToPhotos}/restorePasswordPhoto.jpg`,
  newPasswordImageUrl: `${pathToPhotos}/newPasswordPhoto.jpeg`,
};

const RouteConfig: {
  [key: string]: { backgroundImage: string; logoColor: string };
} = {
  [urls.SIGN_UP]: {
    backgroundImage: imageUrls.signupImageUrl,
    logoColor: theme.palette.common.black,
  },
  [urls.VERIFY]: {
    backgroundImage: imageUrls.verifyImageUrl,
    logoColor: theme.palette.common.white,
  },
  [urls.SIGN_IN]: {
    backgroundImage: imageUrls.signinImageUrl,
    logoColor: theme.palette.common.black,
  },
  [urls.RESTORE_PASSWORD]: {
    backgroundImage: imageUrls.restoreImageUrl,
    logoColor: theme.palette.common.black,
  },
  [urls.ENTER_CODE]: {
    backgroundImage: imageUrls.verifyImageUrl,
    logoColor: theme.palette.common.white,
  },
  [urls.NEW_PASSWORD]: {
    backgroundImage: imageUrls.newPasswordImageUrl,
    logoColor: theme.palette.common.white,
  },
};

const useRoute = () => {
  const location = useLocation();

  return RouteConfig[location.pathname];
};

export default useRoute;

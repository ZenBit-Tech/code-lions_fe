import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { urls } from 'src/common/constants';

const useProfileTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const pathTitleMap: Record<string, string> = {
    [urls.PROFILE_DETAILS]: t('profile.title'),
    [urls.PROFILE_ORDERS]: t('profileMenu.myOrders'),
    [urls.PROFILE_WISHLIST]: t('profileMenu.wishlist'),
    [urls.PROFILE_SETTINGS]: t('profileMenu.settings'),
    [urls.PROFILE_SUPPORT]: t('profileMenu.support'),
  };

  const matchedPath = Object.keys(pathTitleMap).find((path) =>
    location.pathname.includes(path)
  );

  return matchedPath ? pathTitleMap[matchedPath] : t('profile.title');
};

export default useProfileTitle;

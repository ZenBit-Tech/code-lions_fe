import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/query';
import { linkUrls, urlRoles } from 'src/common/constants';
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useGetUserByIdQuery } from 'src/redux/user/userService';

const useUserDetails = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { showToast } = useToast();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };

  const { data, error } = useGetUserByIdQuery(userId ? { userId } : skipToken);

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryError(error) || isSerializedError(error)) {
        showToast(
          'error',
          getErrorMessage(error, t('usersAdmin.fetchUserError'))
        );
      } else {
        showToast('error', t('usersAdmin.fetchUserError'));
      }
    }
  }, [error, showToast, t]);

  const getTitle = (path: string) => {
    if (path.includes(urlRoles.vendors)) return t('userProfileAdmin.vendors');
    if (path.includes(urlRoles.buyers)) return t('userProfileAdmin.buyers');

    return t('userProfileAdmin.users');
  };

  const basePath = location.pathname.replace(`/${userId}`, '');
  const editUrl = `${basePath}/${linkUrls.ADMIN_USER_PROFILE_EDIT}/${userId}`;

  const isEditPage = location.pathname.includes(
    linkUrls.ADMIN_USER_PROFILE_EDIT
  );

  return {
    userId,
    data,
    showModal,
    handleOpen,
    handleClose,
    getTitle,
    editUrl,
    isEditPage,
    name: data?.name,
    basePath,
    location,
    t,
  };
};

export default useUserDetails;
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useGetUserByIdQuery } from 'src/redux/user/userService';

import ProfileField from './ProfileField';
import UserDetailsSection from './UserDetailsSection';

function AdminUserProfilePage() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { userId } = useParams<{ userId: string }>();

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

  if (!data) return null;

  const {
    name,
    phoneNumber,
    email,
    isAccountActive,
    addressLine1,
    addressLine2,
    country,
    state,
    city,
  } = data;

  const addressParts = [
    addressLine1,
    addressLine2,
    city,
    state,
    country,
  ].filter((part) => part);
  const address: string = addressParts.join(', ');

  return (
    <UserDetailsSection sectionHeight="356px">
      <Grid container columns={2} width="100%">
        <Grid item xs={1}>
          <ProfileField label={t('userProfileAdmin.name')} value={name} />
          <ProfileField
            label={t('userProfileAdmin.phoneNumber')}
            value={phoneNumber}
          />
          <ProfileField
            label={t('userProfileAdmin.status')}
            value={
              isAccountActive
                ? t('userProfileAdmin.mockStatusActive')
                : t('userProfileAdmin.mockStatusInactive')
            }
          />
        </Grid>
        <Grid item xs={1}>
          <ProfileField label={t('userProfileAdmin.email')} value={email} />
          <ProfileField
            label={t('userProfileAdmin.completeAddress')}
            value={address}
          />
        </Grid>
      </Grid>
    </UserDetailsSection>
  );
}

export default AdminUserProfilePage;

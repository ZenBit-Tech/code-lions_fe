import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';

import ProfileField from './ProfileField';
import UserDetailsSection from './UserDetailsSection';

function AdminUserProfilePage() {
  const { t } = useTranslation();

  return (
    <UserDetailsSection sectionHeight="356px">
      <Grid container columns={2} width="100%">
        <Grid item xs={1}>
          <ProfileField
            label={t('userProfileAdmin.name')}
            value={t('userProfileAdmin.mockName')}
          />
          <ProfileField
            label={t('userProfileAdmin.phoneNumber')}
            value={t('userProfileAdmin.mockPhoneNumber')}
          />
          <ProfileField
            label={t('userProfileAdmin.status')}
            value={t('userProfileAdmin.mockStatus')}
          />
        </Grid>
        <Grid item xs={1}>
          <ProfileField
            label={t('userProfileAdmin.email')}
            value={t('userProfileAdmin.mockEmail')}
          />
          <ProfileField
            label={t('userProfileAdmin.completeAddress')}
            value={t('userProfileAdmin.mockCompleteAddress')}
          />
        </Grid>
      </Grid>
    </UserDetailsSection>
  );
}

export default AdminUserProfilePage;

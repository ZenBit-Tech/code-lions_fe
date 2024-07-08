import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';

import AddressForm from 'src/pages/ProfilePage/AddressForm';
import theme from 'src/theme';

import AvatarUploader from './AvatarUploader';
import GeneralInformationForm from './GeneralInformationForm';
import { TitleStyled } from './styles';

function VendorProfile() {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TitleStyled
          variant="subtitle1"
          sx={{ fontSize: theme.typography.h5.fontSize }}
        >
          {t('vendorPersonalInfo.title')}
        </TitleStyled>
      </Grid>
      <Grid item xs={12}>
        <AvatarUploader />
      </Grid>
      <Grid item xs={12}>
        <GeneralInformationForm />
      </Grid>
      <Grid item xs={12}>
        <AddressForm />
      </Grid>
    </Grid>
  );
}

export default VendorProfile;

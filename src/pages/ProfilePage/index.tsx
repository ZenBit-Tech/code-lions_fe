import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';

import { urls } from 'src/common/constants';

import AddressForm from './AddressForm';
import CardForm from './CardForm';
import PersonalInformationForm from './PersonalInformationForm';
import SizesForm from './SizesFrom';
import { StyledLink } from './styles';

function ProfilePage() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <PersonalInformationForm />
      </Grid>
      <Grid item xs={12} md={6}>
        <SizesForm />
      </Grid>
      <Grid item xs={12}>
        <StyledLink to={urls.SIZES_GUIDE} state={{ from: location }}>
          <Typography>{t('profileDetails.sizeGuide')}</Typography>
        </StyledLink>
      </Grid>
      <Grid item xs={12}>
        <AddressForm />
      </Grid>
      <Grid item xs={12}>
        <CardForm />
      </Grid>
    </Grid>
  );
}

export default ProfilePage;

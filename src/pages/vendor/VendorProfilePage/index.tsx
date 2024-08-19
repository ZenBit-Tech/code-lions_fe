import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';

import AddressForm from 'src/pages/ProfilePage/AddressForm';
import { useCreateLoginLinkMutation } from 'src/redux/cart/cartService';
import theme from 'src/theme';

import AvatarUploader from './AvatarUploader';
import GeneralInformationForm from './GeneralInformationForm';
import { TitleStyled } from './styles';

function VendorProfilePage() {
  const { t } = useTranslation();

  const [stripeLink, setStripeLink] = useState('');

  const [createLoginLink] = useCreateLoginLinkMutation();

  useEffect(() => {
    const fetchLoginLink = async () => {
      const { url } = await createLoginLink().unwrap();

      setStripeLink(url);
    };

    fetchLoginLink();
  }, [createLoginLink]);

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
      <Grid item xs={12}>
        {stripeLink && (
          <Link to={stripeLink} target="_blank">
            {' '}
            {t('vendorPersonalInfo.goToStripe')}
          </Link>
        )}
      </Grid>
    </Grid>
  );
}

export default VendorProfilePage;

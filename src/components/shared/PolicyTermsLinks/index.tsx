import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextButton from 'src/components/shared/TextButton';
import LabelText from 'src/components/shared/LabelText';
import { Link, useLocation } from 'react-router-dom';
import { urls } from 'src/common/constants';

function PolicyTermsLinks(): JSX.Element {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt="23px"
    >
      <Link to={urls.PRIVACY_POLICY} state={{ from: location }}>
        <TextButton sx={{ padding: '12px 24px' }}>
          <LabelText variant="h4" align="left">
            {t('signup.privacyPolicy')}
          </LabelText>
        </TextButton>
      </Link>
      <Link to={urls.TERMS_OF_USE} state={{ from: location }}>
        <TextButton sx={{ padding: '12px 24px' }}>
          <LabelText variant="h4" align="right">
            {t('signup.termsOfUse')}
          </LabelText>
        </TextButton>
      </Link>
    </Box>
  );
}

export default PolicyTermsLinks;

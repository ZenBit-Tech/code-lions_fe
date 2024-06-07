import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextButton from 'src/components/shared/TextButton';
import LabelText from 'src/components/shared/LabelText';
import { useLocation } from 'react-router-dom';
import { urls } from 'src/common/constants';
import LinkStyled from './styles';

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
      <LinkStyled to={urls.PRIVACY_POLICY} state={{ from: location }}>
        <TextButton sx={{ padding: '12px 24px' }}>
          <LabelText variant="h4" align="left">
            {t('signup.privacyPolicy')}
          </LabelText>
        </TextButton>
      </LinkStyled>
      <LinkStyled to={urls.TERMS_OF_USE} state={{ from: location }}>
        <TextButton sx={{ padding: '12px 24px' }}>
          <LabelText variant="h4" align="right">
            {t('signup.termsOfUse')}
          </LabelText>
        </TextButton>
      </LinkStyled>
    </Box>
  );
}

export default PolicyTermsLinks;

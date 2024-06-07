import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

function TermsOfUsePage() {
  const { t } = useTranslation();

  return (
    <Box>
      <div>{t('termsOfUse.title')}</div>
    </Box>
  );
}

export default TermsOfUsePage;

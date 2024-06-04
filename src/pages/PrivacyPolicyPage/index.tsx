import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

function NewPasswordPage() {
  const { t } = useTranslation();

  return (
    <Box>
      <div>{t('privacyPolicy.title')}</div>
    </Box>
  );
}

export default NewPasswordPage;

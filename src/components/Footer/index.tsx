import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

function Footer() {
  const { t } = useTranslation();

  return <Box>{t('header.home')}</Box>;
}

export default Footer;

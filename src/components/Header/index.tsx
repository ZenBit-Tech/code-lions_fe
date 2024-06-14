import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

function Header() {
  const { t } = useTranslation();

  return <Box>{t('header.home')}</Box>;
}

export default Header;

import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();

  return <div style={{ height: '68px' }}>{t('header.home')}</div>;
}

export default Header;

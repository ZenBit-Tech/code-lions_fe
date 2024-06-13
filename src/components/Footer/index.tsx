import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return <div style={{ height: '68px' }}>{t('header.home')}</div>;
}

export default Footer;

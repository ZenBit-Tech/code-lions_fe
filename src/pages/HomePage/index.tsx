import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();

  return <div>{t('examplePageText.homePage')}</div>;
}

export default HomePage;

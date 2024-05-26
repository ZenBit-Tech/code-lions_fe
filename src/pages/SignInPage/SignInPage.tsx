import { useTranslation } from 'react-i18next';

function SignInPage() {
  const { t } = useTranslation();

  return <div> {t('examplePageText.signInPage')} </div>;
}

export default SignInPage;

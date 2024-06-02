import { useTranslation } from 'react-i18next';
import Section from 'src/components/shared/Section';

function SignInPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <div> {t('examplePageText.signInPage')} </div>
    </Section>
  );
}

export default SignInPage;

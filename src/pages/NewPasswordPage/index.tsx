import { useTranslation } from 'react-i18next';
import Section from 'src/components/shared/Section';

function NewPasswordPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <div>{t('examplePageText.newPasswordPage')}</div>
    </Section>
  );
}

export default NewPasswordPage;

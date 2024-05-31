import { useTranslation } from 'react-i18next';
import Section from 'src/components/shared/Section';
import SocialIconButton from 'src/components/shared/SocialIconButton';
import GoogleIcon from 'src/assets/icons/google.svg';
import Separator from 'src/components/shared/Separator';
import Container from 'src/components/shared/Container';
import SignUpForm from 'src/components/SignUpForm';

function SignUpPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <h1> {t('signup.createAccount')} </h1>
        <h4>{t('signup.signUpSocial')}</h4>
        <SocialIconButton>
          <GoogleIcon />
        </SocialIconButton>
        <Separator text={t('signup.textOr')} />
        <SignUpForm />
      </Container>
    </Section>
  );
}

export default SignUpPage;

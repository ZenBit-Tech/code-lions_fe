import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Section from 'src/components/shared/Section';
import SocialIconButton from 'src/components/shared/SocialIconButton';
import GoogleIcon from 'src/assets/icons/google.svg';
import Separator from 'src/components/shared/Separator';
import Container from 'src/components/shared/Container';
import SignUpForm from 'src/pages/SignUpPage/SignUpForm';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import TextButton from 'src/components/shared/TextButton';
import LabelText from 'src/components/shared/LabelText';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import PolicyTermsLinks from 'src/components/shared/PolicyTermsLinks';

function SignUpPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <TitleInputWrapper>
          <Title>{t('signup.createAccount')} </Title>
          <RegularText>{t('signup.signUpSocial')}</RegularText>
        </TitleInputWrapper>
        <Box mt="22px">
          <SocialIconButton>
            <GoogleIcon />
          </SocialIconButton>
        </Box>
        <Separator text={t('signup.textOr')} />
        <SignUpForm />
        <Box display="flex" justifyContent="center" alignItems="center">
          <RegularText align="left">{t('signup.haveAccount')}</RegularText>
          <Link to="/signin">
            <TextButton sx={{ padding: '12px 0' }}>
              <LabelText align="right">{t('signup.signIn')}</LabelText>
            </TextButton>
          </Link>
        </Box>
        <PolicyTermsLinks />
      </Container>
    </Section>
  );
}

export default SignUpPage;

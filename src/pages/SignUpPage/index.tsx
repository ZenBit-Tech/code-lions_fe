import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useGoogleLogin } from '@react-oauth/google';
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
import GoogleLoginButton from 'src/components/GoogleLoginButton';
import { urls } from 'src/common/constants';
import LinkStyled from './styles';

function SignUpPage() {
  const { t } = useTranslation();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
  });

  return (
    <Section>
      <Container>
        <TitleInputWrapper>
          <Title>{t('signup.createAccount')} </Title>
          <RegularText>{t('signup.signUpSocial')}</RegularText>
        </TitleInputWrapper>
        <Box mt="22px">
          <SocialIconButton onClick={() => login()}>
            <GoogleIcon />
          </SocialIconButton>
        </Box>
        <GoogleLoginButton text="signup_with" />
        <Separator text={t('signup.textOr')} />
        <SignUpForm />
        <Box display="flex" justifyContent="center" alignItems="center">
          <RegularText align="left">{t('signup.haveAccount')}</RegularText>
          <LinkStyled to={urls.SIGN_IN}>
            <TextButton sx={{ padding: '12px 0' }}>
              <LabelText align="right">{t('signup.signIn')}</LabelText>
            </TextButton>
          </LinkStyled>
        </Box>
        <PolicyTermsLinks />
      </Container>
    </Section>
  );
}

export default SignUpPage;

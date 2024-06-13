import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { urls } from 'src/common/constants';
import Section from 'src/components/shared/Section';
import Separator from 'src/components/shared/Separator';
import Container from 'src/components/shared/Container';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import TextButton from 'src/components/shared/TextButton';
import LabelText from 'src/components/shared/LabelText';
import GoogleLoginButton from 'src/components/GoogleLoginButton';
import SignInForm from './SignInForm';
import LinkStyled from './styles';

function SignInPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <TitleInputWrapper mb="22px">
          <Title>{t('signin.signIn')} </Title>
          <RegularText>{t('signin.signInSocial')}</RegularText>
        </TitleInputWrapper>
        <GoogleLoginButton text="signin_with" />
        <Separator text={t('signin.textOr')} />
        <SignInForm />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: '24px' }}
        >
          <RegularText align="left">{t('signin.haveNoAccount')}</RegularText>

          <TextButton sx={{ padding: '0' }}>
            <LinkStyled to={urls.SIGN_UP}>
              <LabelText align="right">{t('signin.signUp')}</LabelText>
            </LinkStyled>
          </TextButton>
        </Box>
      </Container>
    </Section>
  );
}

export default SignInPage;

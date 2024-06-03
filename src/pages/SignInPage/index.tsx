import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import Section from 'src/components/shared/Section';
import SocialIconButton from 'src/components/shared/SocialIconButton';
import GoogleIcon from 'src/assets/icons/google.svg';
import Separator from 'src/components/shared/Separator';
import Container from 'src/components/shared/Container';
import SignInForm from 'src/components/SignInForm';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import TitleInputWrapper from 'src/components/shared/InputWrapper';
import TextButton from 'src/components/shared/TextButton';
import LabelText from 'src/components/shared/LabelText';

function SignInPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <TitleInputWrapper>
          <Title>{t('signin.signIn')} </Title>
          <RegularText>{t('signin.signInSocial')}</RegularText>
        </TitleInputWrapper>
        <Box mt="22px">
          <SocialIconButton>
            <GoogleIcon />
          </SocialIconButton>
        </Box>
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
            <LabelText align="right">{t('signin.signUp')}</LabelText>
          </TextButton>
        </Box>
      </Container>
    </Section>
  );
}

export default SignInPage;

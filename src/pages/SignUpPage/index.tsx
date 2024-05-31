import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import Section from 'src/components/shared/Section';
import SocialIconButton from 'src/components/shared/SocialIconButton';
import GoogleIcon from 'src/assets/icons/google.svg';
import Separator from 'src/components/shared/Separator';
import Container from 'src/components/shared/Container';
import SignUpForm from 'src/components/SignUpForm';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import TitleInputWrapper from 'src/components/shared/InputWrapper';
import TextButton from 'src/components/shared/TextButton';
import LabelText from 'src/components/shared/LabelText';

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
          <TextButton sx={{ padding: '12px 0' }}>
            <LabelText align="right">{t('signup.signIn')}</LabelText>
          </TextButton>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="23px"
        >
          <TextButton sx={{ padding: '12px 24px' }}>
            <LabelText align="left">{t('signup.privacyPolicy')}</LabelText>
          </TextButton>
          <TextButton sx={{ padding: '12px 24px' }}>
            <LabelText align="right">{t('signup.termsOfUse')}</LabelText>
          </TextButton>
        </Box>
      </Container>
    </Section>
  );
}

export default SignUpPage;

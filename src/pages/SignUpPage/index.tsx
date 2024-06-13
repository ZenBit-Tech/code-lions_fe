import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';
import { urls } from 'src/common/constants';
import Section from 'src/components/shared/Section';
import Separator from 'src/components/shared/Separator';
import Container from 'src/components/shared/Container';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import Section from 'src/components/shared/Section';
import Separator from 'src/components/shared/Separator';
import SocialIconButton from 'src/components/shared/SocialIconButton';
import TextButton from 'src/components/shared/TextButton';
import Title from 'src/components/shared/Title';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import PolicyTermsLinks from 'src/components/shared/PolicyTermsLinks';
import GoogleLoginButton from 'src/components/GoogleLoginButton';
import SignUpForm from 'src/pages/SignUpPage/SignUpForm';
import LinkStyled from './styles';

function SignUpPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <TitleInputWrapper mb="22px">
          <Title>{t('signup.createAccount')} </Title>
          <RegularText>{t('signup.signUpSocial')}</RegularText>
        </TitleInputWrapper>
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

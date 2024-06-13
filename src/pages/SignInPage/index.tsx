import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import GoogleIcon from 'src/assets/icons/google.svg';
import { urls } from 'src/common/constants';
import Container from 'src/components/shared/Container';
import TitleInputWrapper from 'src/components/shared/InputWrapper';
import LabelText from 'src/components/shared/LabelText';
import RegularText from 'src/components/shared/RegularText';
import Section from 'src/components/shared/Section';
import Separator from 'src/components/shared/Separator';
import SocialIconButton from 'src/components/shared/SocialIconButton';
import TextButton from 'src/components/shared/TextButton';
import Title from 'src/components/shared/Title';

import SignInForm from './SignInForm';
import LinkStyled from './styles';

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

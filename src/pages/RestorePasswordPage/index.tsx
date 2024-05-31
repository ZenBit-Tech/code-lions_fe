import { useTranslation } from 'react-i18next';
import Section from 'src/components/shared/Section';
import Container from 'src/components/shared/Container';
import RestorePasswordForm from 'src/components/RestorePasswordForm';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';
import { IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from 'src/components/shared/BackgroundImage';
import Logo from 'src/components/shared/Logo';

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '131px 169px 0 94px',
  [theme.breakpoints.up('md')]: {
    width: '35%',
  },
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 0 0 0',
  },
}));

const IconButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

function RestorePasswordPage() {
  const { t } = useTranslation();
  return (
    <Section>
      <Box sx={{ display: 'flex' }}>
        <BackgroundImage url="src/assets/photos/restorePasswordPhoto.jpg">
          <Box sx={{ marginLeft: '63px', marginTop: '42px' }}>
            <Logo />
          </Box>
        </BackgroundImage>
        <FormContainer>
          <Container>
            <IconButtonContainer>
              <IconButton>
                <ArrowLeftIcon />
              </IconButton>
              <Title> {t('restorePassword.restoreYourPassword')} </Title>
            </IconButtonContainer>
            <Box sx={{ marginBottom: '16px' }}>
              <RegularText>{t('restorePassword.enterEmailText')}</RegularText>
            </Box>
            <RestorePasswordForm />
          </Container>
        </FormContainer>
      </Box>
    </Section>
  );
}

export default RestorePasswordPage;

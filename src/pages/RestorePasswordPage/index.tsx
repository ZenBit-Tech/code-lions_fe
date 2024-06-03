import { useTranslation } from 'react-i18next';
import { IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import Section from 'src/components/shared/Section';
import Container from 'src/components/shared/Container';
import RestorePasswordForm from 'src/components/RestorePasswordForm';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
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
    </Section>
  );
}

export default RestorePasswordPage;

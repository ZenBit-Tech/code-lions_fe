import { useTranslation } from 'react-i18next';
import Section from 'src/components/shared/Section';
import Container from 'src/components/shared/Container';
import { Box, IconButton } from '@mui/material';
import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import NewPasswordForm from 'src/components/NewPasswordForm';
import { styled } from '@mui/system';

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

function NewPasswordPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <FormContainer>
        <Container>
          <IconButtonContainer>
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
            <Title> {t('newPassword.newPassword')} </Title>
          </IconButtonContainer>
          <Box sx={{ marginBottom: '32px' }}>
            <RegularText>{t('newPassword.enterNewPasswordText')}</RegularText>
          </Box>
          <NewPasswordForm />
        </Container>
      </FormContainer>
    </Section>
  );
}

export default NewPasswordPage;

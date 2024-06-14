import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';

import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';
import { urls } from 'src/common/constants';
import Container from 'src/components/shared/Container';
import RegularText from 'src/components/shared/RegularText';
import Section from 'src/components/shared/Section';
import Title from 'src/components/shared/Title';
import RestorePasswordForm from 'src/pages/RestorePasswordPage/RestorePasswordForm';

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
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(urls.SIGN_IN);
  };

  return (
    <Section>
      <FormContainer>
        <Container>
          <IconButtonContainer>
            <IconButton onClick={handleBackClick}>
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

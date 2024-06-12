import { Grid, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from 'src/theme';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import TitleInputWrapper from 'src/components/shared/InputWrapper';
import Logo from 'src/components/shared/Logo';
import SignInAdminForm from './SignInAdminForm';
import InnerContainer from './styles';

function SignInAdminPage() {
  const { t } = useTranslation();

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        md={1}
        sx={{
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Logo logoColor={theme.palette.common.black} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={11}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <InnerContainer>
          <TitleInputWrapper>
            <Title>{t('signin.signIn')}</Title>
            <RegularText>{t('signin.enterCredentials')}</RegularText>
          </TitleInputWrapper>
          <Box sx={{ margin: '20px 0 0 0' }}>
            <SignInAdminForm />
          </Box>
        </InnerContainer>
      </Grid>
    </Grid>
  );
}

export default SignInAdminPage;

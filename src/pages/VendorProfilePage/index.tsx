import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import CommentList from 'src/components/shared/CommentList';
import Container from 'src/components/shared/Container';
import ProfileInfo from 'src/pages/VendorProfilePage/ProfileInfo';
import theme from 'src/theme.tsx';

import { MainContainerWrapper, TabButton, TabsWrapper } from './styles';

function VendorProfilePage() {
  return (
    <Container>
      <Header />
      <MainContainerWrapper>
        <ProfileInfo />
        <Container sx={{ marginLeft: '32px' }}>
          <TabsWrapper>
            <TabButton active={false}>Products</TabButton>
            <TabButton active>Reviews (2)</TabButton>
          </TabsWrapper>
          <Typography
            sx={{
              marginBottom: '24px',
              marginTop: '6px',
              fontWeight: theme.typography.h2.fontWeight,
              fontSize: theme.typography.h5.fontSize,
              fontFamily: theme.typography.h1.fontFamily,
            }}
          >
            Reviews(2)
          </Typography>
          <ThemeProvider theme={theme}>
            <CommentList />
          </ThemeProvider>
        </Container>
      </MainContainerWrapper>
      <Footer />
    </Container>
  );
}

export default VendorProfilePage;

import { useTranslation } from 'react-i18next';

import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import CommentList from 'src/components/shared/CommentList';
import Container from 'src/components/shared/Container';
import ProfileInfo from 'src/pages/VendorProfilePage/ProfileInfo';

import {
  MainContainerWrapper,
  ReviewLabel,
  TabButton,
  TabsWrapper,
} from './styles';

function VendorProfilePage() {
  const { t } = useTranslation();

  return (
    <Container>
      <Header />
      <MainContainerWrapper>
        <ProfileInfo />
        <Container sx={{ marginLeft: '32px', width: '100%' }}>
          <TabsWrapper>
            <TabButton active={false}>{t('vendorProfile.products')}</TabButton>
            <TabButton active>{t('vendorProfile.reviews')} (2)</TabButton>
          </TabsWrapper>
          <ReviewLabel>{t('vendorProfile.reviews')} (2)</ReviewLabel>
          <CommentList />
        </Container>
      </MainContainerWrapper>
      <Footer />
    </Container>
  );
}

export default VendorProfilePage;

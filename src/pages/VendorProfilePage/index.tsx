import { useTranslation } from 'react-i18next';

import { CircularProgress } from '@mui/material';

import { profilePathsFor } from 'src/common/constants';
import useUserProfileData from 'src/common/useUserProfileData';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import CommentList from 'src/components/shared/CommentList';
import Container from 'src/components/shared/Container';
import RegularText from 'src/components/shared/RegularText';
import ProfileInfo from 'src/pages/VendorProfilePage/ProfileInfo';

import {
  MainContainerWrapper,
  ReviewLabel,
  TabButton,
  TabsWrapper,
} from './styles';

function VendorProfilePage() {
  const { t } = useTranslation();
  const { userName, userAvatar, userRating, reviewCount, formattedReviews } =
    useUserProfileData();

  if (!userName || reviewCount === undefined) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Header />
      <MainContainerWrapper>
        <ProfileInfo name={userName} rating={userRating} avatar={userAvatar} />
        <Container sx={{ marginLeft: '32px', width: '100%' }}>
          <TabsWrapper>
            <TabButton active={false}>{t('vendorProfile.products')}</TabButton>
            <TabButton active>
              {t('vendorProfile.reviews')} ({reviewCount})
            </TabButton>
          </TabsWrapper>
          <ReviewLabel>
            {t('vendorProfile.reviews')} ({reviewCount})
          </ReviewLabel>
          {reviewCount > 0 ? (
            <CommentList
              comments={formattedReviews}
              path={profilePathsFor.buyer}
            />
          ) : (
            <RegularText>{t('vendorProfile.noReviews')}</RegularText>
          )}
        </Container>
      </MainContainerWrapper>
      <Footer />
    </Container>
  );
}

export default VendorProfilePage;

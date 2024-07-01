import { useTranslation } from 'react-i18next';

import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

import { profilePathsFor, urls } from 'src/common/constants';
import useUserProfileData from 'src/common/useUserProfileData';
import ArrowButtonTo from 'src/components/shared/ArrowButtonTo';
import CommentList from 'src/components/shared/CommentList';
import Container from 'src/components/shared/Container';
import RegularText from 'src/components/shared/RegularText';
import Title from 'src/components/shared/Title';
import ProfileInfo from 'src/pages/BuyerProfilePage/ProfileInfo';

import { MainContainerWrapper, ReviewLabel } from './styles';

function BuyerProfilePage() {
  const { t } = useTranslation();
  const {
    userName,
    userAvatar,
    userRating,
    userOrders,
    reviewCount,
    formattedReviews,
  } = useUserProfileData();
  const location = `/${urls.VENDOR}/${urls.VENDOR_PROFILE}`;

  if (!userName || reviewCount === undefined) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <MainContainerWrapper>
        <Box display="flex" alignItems="center" mb={2}>
          <ArrowButtonTo to={location} />
          <Title>{t('buyerProfile.buyerProfile')}</Title>
        </Box>
        <ProfileInfo
          name={userName}
          rating={userRating}
          avatar={userAvatar}
          orders={userOrders}
        />
        <Container sx={{ width: '100%' }}>
          <ReviewLabel>
            {t('vendorProfile.reviews')} ({reviewCount})
          </ReviewLabel>
          {reviewCount > 0 ? (
            <CommentList
              comments={formattedReviews}
              path={profilePathsFor.vendor}
            />
          ) : (
            <RegularText>{t('buyerProfile.noReviews')}</RegularText>
          )}
        </Container>
      </MainContainerWrapper>
    </Container>
  );
}

export default BuyerProfilePage;

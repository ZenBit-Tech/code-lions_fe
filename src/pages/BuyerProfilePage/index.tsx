import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

import { skipToken } from '@reduxjs/toolkit/query';
import { profilePathsFor, urls } from 'src/common/constants';
import ArrowButtonTo from 'src/components/shared/ArrowButtonTo';
import CommentList from 'src/components/shared/CommentList';
import Container from 'src/components/shared/Container';
import RegularText from 'src/components/shared/RegularText';
import Title from 'src/components/shared/Title';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import ProfileInfo from 'src/pages/BuyerProfilePage/ProfileInfo';
import { IReview } from 'src/redux/user/types';
import {
  useGetPublicUserByIdQuery,
  useGetUserReviewsQuery,
} from 'src/redux/user/userService';

import { MainContainerWrapper, ReviewLabel } from './styles';

function BuyerProfilePage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { id: userId } = useParams<{ id: string }>();
  const location = `/${urls.VENDOR}/${urls.VENDOR_PROFILE}`;

  const { data: user, error: userError } = useGetPublicUserByIdQuery(
    userId || skipToken
  );
  const { data: reviewsData, error: reviewsError } = useGetUserReviewsQuery(
    userId || skipToken
  );

  useEffect(() => {
    if (userError) {
      showToast('error', t('vendorProfile.errorLoadingProfile'));
    }
    if (reviewsError) {
      showToast('error', t('vendorProfile.errorLoadingReviews'));
    }
  }, [userError, reviewsError, showToast, t]);

  if (!user || !reviewsData) {
    return <CircularProgress />;
  }

  const userName = user.name || '';
  const userAvatar = user.photoUrl || '';
  const userRating = user.rating || 0;
  const userOrders = user.orders || 0;
  const reviewCount = reviewsData.length || 0;

  const formattedReviews: IReview[] = reviewsData.map((review: IReview) => ({
    ...review,
  }));

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

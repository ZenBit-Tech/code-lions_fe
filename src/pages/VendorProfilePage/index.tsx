import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import CommentList from 'src/components/shared/CommentList';
import Container from 'src/components/shared/Container';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import ProfileInfo from 'src/pages/VendorProfilePage/ProfileInfo';
import { IGetUserReviewsResponse } from 'src/redux/user/types.ts';
import {
  useGetPublicUserByIdQuery,
  useGetUserReviewsQuery,
} from 'src/redux/user/userService';

import {
  MainContainerWrapper,
  ReviewLabel,
  TabButton,
  TabsWrapper,
} from './styles';

function VendorProfilePage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { id: userId } = useParams<{ id: string }>();

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
  const reviewCount = reviewsData.reviews.length || 0;

  const formattedReviews: IGetUserReviewsResponse = {
    reviews: reviewsData.reviews.map((review) => ({
      ...review,
    })),
  };

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
          <CommentList comments={formattedReviews} />
        </Container>
      </MainContainerWrapper>
      <Footer />
    </Container>
  );
}

export default VendorProfilePage;

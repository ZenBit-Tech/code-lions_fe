import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/query';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { IReview } from 'src/redux/user/types';
import {
  useGetPublicUserByIdQuery,
  useGetUserReviewsQuery,
} from 'src/redux/user/userService';

const useUserProfileData = () => {
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

  const userName = user?.name || '';
  const userAvatar = user?.photoUrl || '';
  const userRating = user?.rating || 0;
  const userOrders = user?.orders || 0;
  const reviewCount = reviewsData?.length || 0;

  const formattedReviews: IReview[] =
    reviewsData?.map((review: IReview) => ({
      ...review,
    })) || [];

  return {
    userName,
    userAvatar,
    userRating,
    userOrders,
    reviewCount,
    formattedReviews,
  };
};

export default useUserProfileData;

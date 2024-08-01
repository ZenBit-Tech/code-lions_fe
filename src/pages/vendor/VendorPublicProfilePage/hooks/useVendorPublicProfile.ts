import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/query';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import useUserProfileData from 'src/common/useUserProfileData';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useGetAllProductsVendorQuery } from 'src/redux/vendorProduct/vendorProductService';

const limit: number = 12;
const pageOne: number = 1;

const useVendorPublicProfile = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { id: userId } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<string>(
    t('vendorProfile.reviews')
  );
  const [page, setPage] = useState<number>(pageOne);

  const { userName, userAvatar, userRating, reviewCount, formattedReviews } =
    useUserProfileData();

  const { data, isLoading, error } = useGetAllProductsVendorQuery(
    userId ? { id: userId, page, limit } : skipToken
  );

  const products = useMemo(() => data?.products || [], [data]);
  const count = useMemo(() => data?.count || 0, [data]);
  const pagesCount = useMemo(() => Math.ceil(count / limit) || 1, [count]);

  const { handleOnSubmitError } = useErrorHandling();

  useEffect(() => {
    if (error) {
      handleOnSubmitError(
        error,
        showToast,
        t('productsAdmin.productListError')
      );
    }
  }, [error, handleOnSubmitError, showToast, t]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return {
    t,
    userName,
    userAvatar,
    userRating,
    reviewCount,
    formattedReviews,
    products,
    pagesCount,
    isLoading,
    page,
    activeTab,
    handleTabChange,
    handleChange,
    pageOne,
  };
};

export default useVendorPublicProfile;

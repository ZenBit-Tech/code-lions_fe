import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { urls } from 'src/common/constants';
import {
  getErrorMessage,
  isFetchBaseQueryError,
} from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from 'src/redux/cart/cartService';
import { ICartItem } from 'src/redux/cart/types';
import { useAppSelector } from 'src/redux/hooks';
import { IProduct } from 'src/redux/product/types';
import { useGetUserReviewsQuery } from 'src/redux/user/userService';
import {
  selectHideRentalRules,
  selectUser,
  selectUserId,
} from 'src/redux/user/userSlice';

const weeksCount: number = 2;
const threeFiveStarsRatings: number = 3;
const averageRatingFourPointNine: number = 4.9;
const fiveStarsRating: number = 5;
const conflictHttpStatus: number = 409;

const useProductSection = (product: IProduct) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const userId = useAppSelector(selectUserId);
  const willHideRentalRules = useAppSelector(selectHideRentalRules);
  const user = useAppSelector(selectUser);
  const cartData = useAppSelector((state) => state.cart);

  const [selectedSize] = useState<string>(product.size);
  const [value, setValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rulesErrorPopupVisible, setRulesErrorPopupVisible] = useState(false);
  const [rulesErrorMessage, setRulesErrorMessage] = useState('');

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();
  const { data: reviewsData } = useGetUserReviewsQuery(userId || skipToken);

  const hasThreeFiveStarReviews = reviewsData
    ? reviewsData.filter((review) => review.rating === fiveStarsRating)
        .length >= threeFiveStarsRatings
    : false;
  const isHighRated = user ? user.rating >= averageRatingFourPointNine : false;
  const isEligibleForExtendedPrivileges =
    hasThreeFiveStarReviews && isHighRated;

  const durations = useMemo(() => {
    const baseDurations = [{ duration: 7, price: product.price }];

    if (isEligibleForExtendedPrivileges) {
      baseDurations.push({ duration: 14, price: product.price * weeksCount });
    }

    return baseDurations;
  }, [isEligibleForExtendedPrivileges, product.price]);

  const isProductInCart = cartData?.some(
    (item: ICartItem) => item.productId === product.id
  );

  const handleOpen = useCallback(() => setShowModal(true), []);

  const handleClose = useCallback(() => setShowModal(false), []);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleAddToCart = useCallback(async () => {
    const selectedDuration = durations.find(
      (d) => d.duration.toString() === value
    );

    if (!selectedDuration) {
      showToast('error', t('product.durationNotSelected'));

      return false;
    }

    try {
      await addToCart({
        userId,
        productId: product.id,
        duration: selectedDuration.duration,
        price: selectedDuration.price,
      }).unwrap();
      showToast('success', t('cart.productAdded'));

      return true;
    } catch (error) {
      if (isFetchBaseQueryError(error) && error.status === conflictHttpStatus) {
        const message =
          (error.data as { message?: string }).message ||
          t('cart.conflictError');

        setRulesErrorMessage(message);
        setRulesErrorPopupVisible(true);
      } else {
        const toastError = getErrorMessage(
          error as FetchBaseQueryError | SerializedError,
          t('cart.addError')
        );

        showToast('error', toastError);
      }

      return false;
    }
  }, [addToCart, durations, showToast, t, userId, value]);

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart({
        userId,
        productId: product.id,
      }).unwrap();
      showToast('success', t('cart.productRemoved'));
    } catch (error) {
      const toastError = getErrorMessage(
        error as FetchBaseQueryError | SerializedError,
        t('cart.removeError')
      );

      showToast('error', toastError);
    }
  };

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!userId) {
      showToast('warning', t('cart.addWarning'));
    }
  };

  const handleAddToCartOrOpenModal = useCallback(async () => {
    if (willHideRentalRules) {
      await handleAddToCart();
    } else {
      handleOpen();
    }
  }, [willHideRentalRules, handleAddToCart, handleOpen]);

  const handleGoToWishlistClick = () => {
    if (!userId) {
      showToast('warning', t('wishlist.viewWarning'));
    } else {
      navigate(`${urls.PROFILE}/${urls.WISHLIST}/${userId}`);
    }
  };

  return {
    userId,
    selectedSize,
    value,
    setValue,
    showModal,
    handleOpen,
    handleClose,
    handleRadioChange,
    handleAddToCart,
    handleRemoveFromCart,
    handleCartClick,
    handleAddToCartOrOpenModal,
    handleGoToWishlistClick,
    isProductInCart,
    isAddingToCart,
    isRemovingFromCart,
    durations,
    rulesErrorPopupVisible,
    setRulesErrorPopupVisible,
    rulesErrorMessage,
  };
};

export default useProductSection;

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query';
import {
  getErrorMessage,
  isFetchBaseQueryError,
} from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from 'src/redux/cart/cartService';
import { useAppSelector } from 'src/redux/hooks';
import { IProduct } from 'src/redux/product/types';
import { useGetUserReviewsQuery } from 'src/redux/user/userService';
import {
  selectUserId,
  selectHideRentalRules,
  selectUser,
} from 'src/redux/user/userSlice';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from 'src/redux/wishlist/wishlistService';

const decimalPrecision: number = 2;
const defaultDuration: number = 7;
const rentDurationTwoWeeks: number = 14;
const weeksCount: number = 2;
const threeFiveStarsRatings: number = 3;
const averageRatingFourPointNine: number = 4.9;
const fiveStarsRating: number = 5;
const conflictHttpStatus: number = 409;

const useProductCard = (item: IProduct) => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const userId = useAppSelector(selectUserId);
  const willHideRentalRules = useAppSelector(selectHideRentalRules);
  const user = useAppSelector(selectUser);
  const wishlistData = useAppSelector((state) => state.wishlist);
  const cartData = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showSelectDurationModal, setShowSelectDurationModal] =
    useState<boolean>(false);
  const [duration, setDuration] = useState<number>(defaultDuration);
  const [rulesErrorPopupVisible, setRulesErrorPopupVisible] = useState(false);
  const [rulesErrorMessage, setRulesErrorMessage] = useState('');

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const { data: reviewsData } = useGetUserReviewsQuery(userId || skipToken);

  const hasThreeFiveStarReviews = reviewsData
    ? reviewsData.filter((review) => review.rating === fiveStarsRating)
        .length >= threeFiveStarsRatings
    : false;
  const isHighRated = user ? user.rating >= averageRatingFourPointNine : false;
  const isEligibleForExtendedPrivileges =
    hasThreeFiveStarReviews && isHighRated;

  const durations = useMemo(() => {
    const baseDurations = [{ duration: 7, price: item.price }];

    if (isEligibleForExtendedPrivileges) {
      baseDurations.push({
        duration: 14,
        price: parseFloat((item.price * weeksCount).toFixed(decimalPrecision)),
      });
    }

    return baseDurations;
  }, [isEligibleForExtendedPrivileges, item.price]);

  useEffect(() => {
    if (wishlistData) {
      const isWishlistItem = wishlistData.some(
        (wishlistItem: { id: string }) => wishlistItem.id === item.id
      );

      setIsInWishlist(isWishlistItem);
    }
  }, [wishlistData, item.id]);

  useEffect(() => {
    if (cartData) {
      const isCartItem = cartData.some(
        (cartItem: { productId: string }) => cartItem.productId === item.id
      );

      setIsInCart(isCartItem);
    }
  }, [cartData, item.id]);

  const handleRulesModalOpen = useCallback(() => setShowRulesModal(true), []);

  const handleRulesModalClose = useCallback(() => setShowRulesModal(false), []);

  const handleSelectDurationModalOpen = useCallback(
    () => setShowSelectDurationModal(true),
    []
  );

  const handleSelectDurationModalClose = useCallback(
    () => setShowSelectDurationModal(false),
    []
  );

  const handleAddToWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      try {
        await addToWishlist({ userId, productId: item.id }).unwrap();
        setIsInWishlist(true);
      } catch (error) {
        const toastError = getErrorMessage(
          error as FetchBaseQueryError | SerializedError,
          t('wishlist.addError')
        );

        showToast('error', toastError);
      }
    }
  };

  const handleRemoveFromWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      try {
        await removeFromWishlist({ userId, productId: item.id }).unwrap();
        setIsInWishlist(false);
      } catch (error) {
        const toastError = getErrorMessage(
          error as FetchBaseQueryError | SerializedError,
          t('wishlist.removeError')
        );

        showToast('error', toastError);
      }
    }
  };

  const handleAddToCart = useCallback(
    async (rentDuration: number) => {
      if (userId) {
        try {
          const price =
            rentDuration === rentDurationTwoWeeks
              ? parseFloat((item.price * weeksCount).toFixed(decimalPrecision))
              : parseFloat(item.price.toFixed(decimalPrecision));

          if (!rentDuration) {
            showToast('error', t('product.durationNotSelected'));

            return;
          }

          await addToCart({
            userId,
            productId: item.id,
            duration: rentDuration,
            price,
          }).unwrap();
          setIsInCart(true);
          showToast('success', t('cart.productAdded'));
        } catch (error) {
          if (
            isFetchBaseQueryError(error) &&
            error.status === conflictHttpStatus
          ) {
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
        }
      }
    },
    [userId, addToCart, item.price, showToast, t]
  );

  const handleRemoveFromCart = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      try {
        await removeFromCart({ userId, productId: item.id }).unwrap();
        setIsInCart(false);
        showToast('success', t('cart.productRemoved'));
      } catch (error) {
        const toastError = getErrorMessage(
          error as FetchBaseQueryError | SerializedError,
          t('cart.removeError')
        );

        showToast('error', toastError);
      }
    }
  };

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!userId) {
      showToast('warning', t('cart.addWarning'));
    }
  };

  const handleAddToCartOrOpenModal = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (willHideRentalRules && !isEligibleForExtendedPrivileges) {
        await handleAddToCart(defaultDuration);
      } else if (willHideRentalRules && isEligibleForExtendedPrivileges) {
        handleSelectDurationModalOpen();
      } else {
        handleRulesModalOpen();
      }
    },
    [
      willHideRentalRules,
      isEligibleForExtendedPrivileges,
      handleAddToCart,
      handleSelectDurationModalOpen,
      handleRulesModalOpen,
    ]
  );

  return {
    userId,
    isInWishlist,
    isInCart,
    showRulesModal,
    showSelectDurationModal,
    isAddingToCart,
    durations,
    handleRulesModalClose,
    handleSelectDurationModalOpen,
    handleSelectDurationModalClose,
    handleAddToCartOrOpenModal,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleRemoveFromCart,
    handleCartClick,
    navigate,
    duration,
    setDuration,
    isEligibleForExtendedPrivileges,
    rulesErrorMessage,
    rulesErrorPopupVisible,
    setRulesErrorPopupVisible,
  };
};

export default useProductCard;

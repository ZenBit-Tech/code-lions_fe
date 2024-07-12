import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from 'src/redux/cart/cartService';
import { useAppSelector } from 'src/redux/hooks';
import { IProduct } from 'src/redux/product/types';
import { selectUserId } from 'src/redux/user/userSlice';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from 'src/redux/wishlist/wishlistService';

const duration: number = 7;

const useProductCard = (item: IProduct) => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const userId = useSelector(selectUserId);

  const navigate = useNavigate();

  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const wishlistData = useAppSelector((state) => state.wishlist);
  const cartData = useAppSelector((state) => state.cart);

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

  const handleAddToCart = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      try {
        await addToCart({
          userId,
          productId: item.id,
          duration,
          price: item.price,
        }).unwrap();
        setIsInCart(true);
        showToast('success', t('cart.productAdded'));
      } catch (error) {
        const toastError = getErrorMessage(
          error as FetchBaseQueryError | SerializedError,
          t('cart.addError')
        );

        showToast('error', toastError);
      }
    }
  };

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

  return {
    userId,
    isInWishlist,
    isInCart,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleRemoveFromCart,
    handleCartClick,
    navigate,
  };
};

export default useProductCard;

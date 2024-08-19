import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserId } from 'src/redux/user/userSlice';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from 'src/redux/wishlist/wishlistService';

const useImagesSection = (productId: string, images: string[]) => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [open, setOpen] = useState<boolean>(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  const userId = useSelector(selectUserId);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const wishlistData = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlistData) {
      const isWishlistItem = wishlistData.some(
        (wishlistItem: { id: string }) => wishlistItem.id === productId
      );

      setIsInWishlist(isWishlistItem);
    }
  }, [wishlistData, productId]);

  const handleOpen = (index: number) => {
    setInitialSlideIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleImageClick = (src: string, index: number) => {
    setSelectedImage(src);
    setInitialSlideIndex(index);
  };

  const handleAddToWishlist = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (userId) {
      try {
        await addToWishlist({ userId, productId }).unwrap();
      } catch (error) {
        const toastError = getErrorMessage(
          error as FetchBaseQueryError | SerializedError,
          t('wishlist.addError')
        );

        showToast('error', toastError);
      }
    }
  };

  const handleRemoveFromWishlist = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (userId) {
      try {
        await removeFromWishlist({ userId, productId }).unwrap();
      } catch (error) {
        const toastError = getErrorMessage(
          error as FetchBaseQueryError | SerializedError,
          t('wishlist.removeError')
        );

        showToast('error', toastError);
      }
    }
  };

  return {
    userId,
    selectedImage,
    open,
    initialSlideIndex,
    isInWishlist,
    handleOpen,
    handleClose,
    handleImageClick,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  };
};

export default useImagesSection;

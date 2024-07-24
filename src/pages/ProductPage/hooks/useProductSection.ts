import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from 'src/redux/cart/cartService';
import { ICartItem } from 'src/redux/cart/types';
import { useAppSelector } from 'src/redux/hooks';
import { IProduct } from 'src/redux/product/types';
import { selectHideRentalRules, selectUserId } from 'src/redux/user/userSlice';

const durations = [
  { duration: 7, price: 0 },
  { duration: 14, price: 0 },
];

const weeksCount = 2;

const useProductSection = (product: IProduct) => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const userId = useSelector(selectUserId);
  const willHideRentalRules = useSelector(selectHideRentalRules);

  const [selectedSize] = useState<string>(product.size);
  const [value, setValue] = useState<string>(durations[0]?.duration.toString());
  const [showModal, setShowModal] = useState<boolean>(false);

  durations[0].price = product.price;
  durations[1].price = product.price * weeksCount;

  const cartData = useAppSelector((state) => state.cart);

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();

  const isProductInCart = cartData?.some(
    (item: ICartItem) => item.productId === product.id
  );

  const handleOpen = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleAddToCart = async () => {
    const selectedDuration = durations.find(
      (d) => d.duration.toString() === value
    );

    if (!selectedDuration) {
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
      const toastError = getErrorMessage(
        error as FetchBaseQueryError | SerializedError,
        t('cart.addError')
      );

      showToast('error', toastError);

      return false;
    }
  };

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
    isProductInCart,
    isAddingToCart,
    isRemovingFromCart,
    durations,
  };
};

export default useProductSection;

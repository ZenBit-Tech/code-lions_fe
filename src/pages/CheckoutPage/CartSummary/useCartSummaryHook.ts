import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { shippingFee, shippingOption } from 'src/common/constants';
import { getErrorMessage } from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useCreateCheckoutSessionMutation } from 'src/redux/cart/cartService';
import { ICartItem } from 'src/redux/cart/types';

const useCartSummary = (cartItems: ICartItem[], shipping: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [numberOfVendors, setNumberOfVendors] = useState<number>(0);

  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  useEffect(() => {
    const itemsSubtotal = cartItems.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    setSubtotal(itemsSubtotal);

    const uniqueVendorIds = new Set(cartItems.map((item) => item.vendorId));

    setNumberOfVendors(uniqueVendorIds.size);

    let calculatedShippingPrice = 0;

    if (shipping === shippingOption.FREE) {
      calculatedShippingPrice = shippingFee.FREE;
    } else if (shipping === shippingOption.EXPRESS) {
      calculatedShippingPrice = shippingFee.EXPRESS;
    }

    setShippingPrice(calculatedShippingPrice * numberOfVendors);

    setTotal(itemsSubtotal + shippingPrice);
  }, [cartItems, numberOfVendors, shipping, shippingPrice]);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      return;
    }
    try {
      const productIds = cartItems.map((item) => item.productId);
      const result = await createCheckoutSession({
        total,
        productIds,
        shippingPrice,
      }).unwrap();

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      const toastError = getErrorMessage(
        error as FetchBaseQueryError | SerializedError,
        t('checkoutPage.checkoutError')
      );

      showToast('error', toastError);
    }
  };

  return {
    subtotal,
    total,
    shippingPrice,
    numberOfVendors,
    isLoading,
    handlePayment,
  };
};

export default useCartSummary;

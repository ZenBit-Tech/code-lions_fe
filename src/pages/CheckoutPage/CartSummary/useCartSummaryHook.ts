import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ICartItem } from 'src/redux/cart/types';

const useCartSummary = (cartItems: ICartItem[], shipping: string) => {
  const { t } = useTranslation();
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const itemsSubtotal = cartItems.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    setSubtotal(itemsSubtotal);

    if (shipping === t('checkoutPage.freeShipping')) {
      setShippingPrice(0);
    } else if (shipping === t('checkoutPage.expressShipping')) {
      setShippingPrice(Number(t('checkoutPage.expressPrice')));
    }

    setTotal(itemsSubtotal + shippingPrice);
  }, [cartItems, shipping, shippingPrice, t]);

  return { subtotal, total };
};

export default useCartSummary;

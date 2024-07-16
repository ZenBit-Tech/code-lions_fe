import { useEffect, useState } from 'react';

import { shippingFee, shippingOption } from 'src/common/constants';
import { ICartItem } from 'src/redux/cart/types';

const useCartSummary = (cartItems: ICartItem[], shipping: string) => {
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const itemsSubtotal = cartItems.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    setSubtotal(itemsSubtotal);

    if (shipping === shippingOption.FREE) {
      setShippingPrice(shippingFee.FREE);
    } else if (shipping === shippingOption.EXPRESS) {
      setShippingPrice(shippingFee.EXPRESS);
    }

    setTotal(itemsSubtotal + shippingPrice);
  }, [cartItems, shipping, shippingPrice]);

  return { subtotal, total };
};

export default useCartSummary;

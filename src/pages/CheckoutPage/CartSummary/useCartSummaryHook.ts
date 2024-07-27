import { useEffect, useState } from 'react';

import { shippingFee, shippingOption } from 'src/common/constants';
import { ICartItem } from 'src/redux/cart/types';

const useCartSummary = (cartItems: ICartItem[], shipping: string) => {
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [numberOfVendors, setNumberOfVendors] = useState<number>(0);

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

  return { subtotal, total, numberOfVendors };
};

export default useCartSummary;

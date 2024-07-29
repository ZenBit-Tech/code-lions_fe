import { useMemo } from 'react';

import { ICartItem } from 'src/redux/cart/types';

type GroupedByVendor = {
  [vendorName: string]: ICartItem[];
};

const useGroupedByVendor = (cartItems: ICartItem[]) => {
  const groupedEntries = useMemo(() => {
    const groupedByVendor: GroupedByVendor = {};

    cartItems.forEach((item) => {
      const { vendorName } = item;

      if (!groupedByVendor[vendorName]) {
        groupedByVendor[vendorName] = [];
      }
      groupedByVendor[vendorName].push(item);
    });

    return Object.entries(groupedByVendor);
  }, [cartItems]);

  return groupedEntries;
};

export default useGroupedByVendor;

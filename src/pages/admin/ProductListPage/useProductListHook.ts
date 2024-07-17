import { useMemo } from 'react';

import { IProduct } from 'src/redux/product/types';

interface UseProductsParams {
  data?: {
    products?: IProduct[];
    count?: number;
  };
  limit?: number;
}

const limit = 5;

const useProducts = ({ data }: UseProductsParams) => {
  const products = useMemo(() => data?.products || [], [data]);
  const count = useMemo(() => data?.count || 1, [data]);
  const pagesCount = useMemo(() => Math.ceil(count / limit), [count]);

  return {
    products,
    count,
    pagesCount,
  };
};

export default useProducts;

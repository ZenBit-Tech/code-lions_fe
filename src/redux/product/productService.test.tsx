import { renderHook, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/redux/store';
import allProducts from 'src/test/mocks/allproducts';

import { productApi } from './productService';

describe('productApi', () => {
  const { useGetProductsQuery } = productApi;

  it('fetches products successfully', async () => {
    const { result } = renderHook(() => useGetProductsQuery({}), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() =>
      expect(result.current.data?.products).toEqual(allProducts)
    );
  });
});

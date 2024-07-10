import { renderHook, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/redux/store';
import allProducts from 'src/test/mocks/allproducts';
import singleProduct from 'src/test/mocks/singleProduct';

import { productApi } from './productService';

describe('productApi', () => {
  const { useGetProductsQuery, useGetProductByIdQuery } = productApi;

  it('fetches products successfully', async () => {
    const { result } = renderHook(() => useGetProductsQuery(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(allProducts));
  });

  it('fetches a product by ID successfully', async () => {
    const productId = singleProduct.id;
    const { result } = renderHook(() => useGetProductByIdQuery({ productId }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(singleProduct));
  });
});

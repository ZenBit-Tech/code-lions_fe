import { renderHook, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/redux/store';
import allProducts from 'src/test/mocks/allproducts';
import latestProducts from 'src/test/mocks/latestProducts';
import productsBySizes from 'src/test/mocks/productsBySizes';

import { productApi } from './productService';

describe('productApi', () => {
  const {
    useGetProductsQuery,
    useGetProductsBySizesQuery,
    useGetLatestProductsQuery,
    useGetProductByIdQuery
  } = productApi;

  it('fetches products successfully', async () => {
    const { result } = renderHook(() => useGetProductsQuery(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(allProducts));
  });

  it('fetches a product by ID successfully', async () => {
    const productId = allProducts[0].id;
    const { result } = renderHook(() => useGetProductByIdQuery({ productId }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(allProducts[0]));
  });

  it('fetches products by sizes successfully', async () => {
    const sizes = { clothesSize: 'M', jeansSize: '32', shoesSize: '10' };
    const { result } = renderHook(() => useGetProductsBySizesQuery(sizes), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(productsBySizes));
  });

  it('fetches latest products successfully', async () => {
    const { result } = renderHook(() => useGetLatestProductsQuery(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(latestProducts));
  });
});

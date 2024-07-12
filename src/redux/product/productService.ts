import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';

import { IProducts, IProduct } from './types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<IProducts, void>({
      query: () => ({
        url: RTKUrls.PRODUCTS,
        method: HttpMethods.GET,
      }),
      providesTags: ['Product'],
    }),
    getProductById: build.query<IProduct, { productId: string }>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS}/item/${productId}`,
        method: HttpMethods.GET,
      }),
    }),
    getProductsBySizes: build.query<
      IProducts,
      { clothesSize: string; jeansSize: string; shoesSize: string }
    >({
      query: ({ clothesSize, jeansSize, shoesSize }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.SIZES}`,
        method: HttpMethods.GET,
        params: { clothesSize, jeansSize, shoesSize },
      }),
      providesTags: ['Product'],
    }),
    getLatestProducts: build.query<IProducts, void>({
      query: () => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.LATEST}`,
        method: HttpMethods.GET,
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsBySizesQuery,
  useGetLatestProductsQuery,
  useGetProductByIdQuery
} = productApi;

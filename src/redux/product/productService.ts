import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';

import { IProduct } from './types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], void>({
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
        params: { id: productId },
      }),
    }),
    getWishlistById: build.query<IProduct[], { userId: string }>({
      query: ({ userId }) => ({
        url: `wishlist/${userId}`,
        method: HttpMethods.GET,
        params: { id: userId },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetWishlistByIdQuery,
} = productApi;

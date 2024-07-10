import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';

import { IProduct, IProducts } from './types';

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
        params: { id: productId },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;

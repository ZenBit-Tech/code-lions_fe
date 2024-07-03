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
  }),
});

export const { useGetProductsQuery } = productApi;

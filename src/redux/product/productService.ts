import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';

import { IProductResponse, IProduct, IProductRequest } from './types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<IProductResponse, IProductRequest>({
      query: ({ page, limit, search, filters, sortBy, sortOrder }) => ({
        url: RTKUrls.PRODUCTS,
        method: HttpMethods.GET,
        params: { page, limit, search, ...filters, sortBy, sortOrder },
      }),
      providesTags: (result) =>
        result?.products
          ? [
            ...result.products.map(
              ({ id }) => ({ type: 'Product', id }) as const
            ),
            { type: 'Product', id: 'LIST' },
          ]
          : [{ type: 'Product', id: 'LIST' }],
      transformResponse: (response: {
        products: IProduct[];
        count: number;
      }): IProductResponse => {
        return {
          products: response.products,
          count: response.count,
        };
      },
    }),

    getProductById: build.query<IProduct, { productId: string }>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS}/item/${productId}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;

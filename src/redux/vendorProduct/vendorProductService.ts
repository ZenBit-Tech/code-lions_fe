import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants.ts';

import { baseQueryWithReauth } from '../user/userService';

import {
  IVendorProductsRequest,
  IVendorProductsResponse,
  IVendorDeleteProductRequest,
} from './types';

export const vendorProductsApi = createApi({
  reducerPath: 'vendorProductsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['VendorProduct'],
  endpoints: (build) => ({
    getAllProductsVendor: build.query<
      IVendorProductsResponse,
      IVendorProductsRequest
    >({
      query: ({ id, page, sortOrder, search, limit }) => ({
        url: `${RTKUrls.PRODUCTS_VENDOR}/${id}`,
        method: HttpMethods.GET,
        params: { page, sortOrder, search, limit },
      }),
      providesTags: (result) =>
        result ? [{ type: 'VendorProduct', id: 'LIST' }] : [],
    }),
    deleteProductVendor: build.mutation<void, IVendorDeleteProductRequest>({
      query: ({ productId, id }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}/${productId}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [{ type: 'VendorProduct', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllProductsVendorQuery, useDeleteProductVendorMutation } =
  vendorProductsApi;

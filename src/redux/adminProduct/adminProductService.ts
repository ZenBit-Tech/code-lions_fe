import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants.ts';

import { baseQueryWithReauth } from '../user/userService';

import {
  IAdminProductsResponse,
  IAdminProductsRequest,
  IAdminEditProductRequest,
} from './types';

export const adminProductsApi = createApi({
  reducerPath: 'adminProductsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AdminProduct'],
  endpoints: (build) => ({
    getAllProducts: build.query<IAdminProductsResponse, IAdminProductsRequest>({
      query: ({ list, page, sortOrder, search }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN}/${list}`,
        method: HttpMethods.GET,
        params: { page, sortOrder, search },
      }),
      providesTags: (result) =>
        result ? [{ type: 'AdminProduct', id: 'LIST' }] : [],
    }),
    approveProduct: build.mutation<void, IAdminEditProductRequest>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN_APPROVE}/${productId}`,
        method: HttpMethods.PATCH,
        body: { productId },
      }),
      invalidatesTags: [{ type: 'AdminProduct', id: 'LIST' }],
    }),
    rejectProduct: build.mutation<void, IAdminEditProductRequest>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN_REJECT}/${productId}`,
        method: HttpMethods.PATCH,
        body: { productId },
      }),
      invalidatesTags: [{ type: 'AdminProduct', id: 'LIST' }],
    }),
    deleteProduct: build.mutation<void, IAdminEditProductRequest>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN_APPROVE}/${productId}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [{ type: 'AdminProduct', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useApproveProductMutation,
  useRejectProductMutation,
  useDeleteProductMutation,
} = adminProductsApi;

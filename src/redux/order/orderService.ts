import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { baseQueryWithReauth } from 'src/redux/user/userService';

import {
  IOrderData,
  IVendorOrdersRequest,
  IVendorOrdersResponse,
} from './types';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order', 'Orders'],
  endpoints: (build) => ({
    getOrderByUserIdAndOrderId: build.query<IOrderData, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `${RTKUrls.ORDERS}/${orderId}`,
        method: HttpMethods.GET,
      }),
      providesTags: ['Order'],
    }),

    rejectOrder: build.mutation<void, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `${RTKUrls.ORDERS}/${orderId}`,
        method: HttpMethods.PATCH,
      }),
      invalidatesTags: ['Order'],
    }),
    getAllOrdersVendor: build.query<
      IVendorOrdersResponse,
      IVendorOrdersRequest
    >({
      query: ({ id }) => ({
        url: `${RTKUrls.ORDERS_VENDOR}/${id}`,
        method: HttpMethods.GET,
      }),
      providesTags: (result) =>
        result ? [{ type: 'Orders', id: 'LIST' }] : [],
    }),
  }),
});

export const {
  useGetOrderByUserIdAndOrderIdQuery,
  useRejectOrderMutation,
  useGetAllOrdersVendorQuery,
} = orderApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { baseQueryWithReauth } from 'src/redux/user/userService';

import {
  IOrderData,
  IVendorOrdersRequest,
  IVendorOrdersResponse,
  IOrder,
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
    getBuyerOrders: build.query<IOrder[], { statuses: string[] }>({
      query: ({ statuses }) => {
        const statusQuery = statuses
          .map((status) => `statuses=${status}`)
          .join('&');

        return {
          url: `${RTKUrls.BUYER_ORDERS}?${statusQuery}`,
          method: HttpMethods.GET,
        };
      },
    }),
  }),
});

export const {
  useGetOrderByUserIdAndOrderIdQuery,
  useRejectOrderMutation,
  useGetAllOrdersVendorQuery,
  useGetBuyerOrdersQuery,
} = orderApi;

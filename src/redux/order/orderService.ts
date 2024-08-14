import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { baseQueryWithReauth } from 'src/redux/user/userService';

import {
  IOrderData,
  IVendorOrdersRequest,
  IVendorOrdersResponse,
  IOrder,
  IVendorPaginatedOrdersRequest,
  IVendorPaginatedOrdersResponse,
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

    rejectOrder: build.mutation<
      void,
      { orderId: number; rejectReason: string }
    >({
      query: ({ orderId, rejectReason }) => ({
        url: `${RTKUrls.ORDERS}/${RTKUrls.REJECT}/${orderId}`,
        method: HttpMethods.PATCH,
        body: { rejectReason },
      }),
      invalidatesTags: ['Order', 'Orders'],
    }),

    sendOrder: build.mutation<
      void,
      { orderId: number; trackingNumber: string }
    >({
      query: ({ orderId, trackingNumber }) => ({
        url: `${RTKUrls.ORDERS}/${RTKUrls.SEND}/${orderId}`,
        method: HttpMethods.PATCH,
        body: { trackingNumber },
      }),
      invalidatesTags: ['Order', 'Orders'],
    }),

    receiveOrder: build.mutation<void, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `${RTKUrls.ORDERS}/${RTKUrls.RECEIVE}/${orderId}`,
        method: HttpMethods.PATCH,
      }),
      invalidatesTags: ['Order', 'Orders'],
    }),

    sendBackOrder: build.mutation<
      void,
      { orderId: number; trackingNumber: string }
    >({
      query: ({ orderId, trackingNumber }) => ({
        url: `${RTKUrls.ORDERS}/${RTKUrls.SEND_BACK}/${orderId}`,
        method: HttpMethods.PATCH,
        body: { trackingNumber },
      }),
      invalidatesTags: ['Order', 'Orders'],
    }),

    returnOrder: build.mutation<void, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `${RTKUrls.ORDERS}/${RTKUrls.RETURN}/${orderId}`,
        method: HttpMethods.PATCH,
      }),
      invalidatesTags: ['Order', 'Orders'],
    }),

    paySendOrder: build.mutation<
      void,
      { orderId: number; trackingNumber: string }
    >({
      query: ({ orderId, trackingNumber }) => ({
        url: `${RTKUrls.ORDERS}/${RTKUrls.PAY_SEND}/${orderId}`,
        method: HttpMethods.PATCH,
        body: { trackingNumber },
      }),
      invalidatesTags: ['Order', 'Orders'],
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
    getAllPaginatedOrdersVendor: build.query<
      IVendorPaginatedOrdersResponse,
      IVendorPaginatedOrdersRequest
    >({
      query: ({ status, page, sortBy, sortOrder }) => ({
        url: `${RTKUrls.ORDERS_VENDOR}`,
        method: HttpMethods.GET,
        params: {
          status,
          page,
          sortBy,
          sortOrder,
        },
      }),
      providesTags: (result) =>
        result ? [{ type: 'Orders', id: 'LIST' }] : [],
    }),
  }),
});

export const {
  useGetOrderByUserIdAndOrderIdQuery,
  useRejectOrderMutation,
  useReceiveOrderMutation,
  useSendOrderMutation,
  useSendBackOrderMutation,
  useReturnOrderMutation,
  usePaySendOrderMutation,
  useGetAllOrdersVendorQuery,
  useGetBuyerOrdersQuery,
  useGetAllPaginatedOrdersVendorQuery,
} = orderApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { baseQueryWithReauth } from 'src/redux/user/userService';

import { IOrderData } from './types';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],
  endpoints: (build) => ({
    getOrderByUserIdAndOrderId: build.query<
      IOrderData,
      { userId: string; orderId: number }
    >({
      query: ({ userId, orderId }) => ({
        url: `${RTKUrls.ORDERS}/${userId}/${orderId}`,
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
  }),
});

export const { useGetOrderByUserIdAndOrderIdQuery, useRejectOrderMutation } =
  orderApi;

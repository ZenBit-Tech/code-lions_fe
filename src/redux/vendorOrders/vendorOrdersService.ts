import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants.ts';

import { baseQueryWithReauth } from '../user/userService';

export const vendorOrdersApi = createApi({
  reducerPath: 'vendorOrdersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['VendorOrder'],
  endpoints: (build) => ({
    getAllOrdersVendor: build.query<
      IVendorOrdersResponse,
      IVendorOrdersRequest
    >({
      query: ({ id }) => ({
        url: `${RTKUrls.ORDERS_VENDOR}/${id}`,
        method: HttpMethods.GET,
      }),
      providesTags: (result) =>
        result ? [{ type: 'VendorOrder', id: 'LIST' }] : [],
    }),
  }),
});

export const { useGetAllOrdersVendorQuery } = vendorOrdersApi;

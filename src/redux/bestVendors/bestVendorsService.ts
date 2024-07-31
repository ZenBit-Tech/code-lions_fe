import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';

import { IBestVendor, IFollower } from './types';

export const bestVendorsApi = createApi({
  reducerPath: 'bestVendorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['BestVendor'],
  endpoints: (build) => ({
    getBestVendors: build.query<IBestVendor[], void>({
      query: () => ({
        url: RTKUrls.BEST_VENDORS,
        method: HttpMethods.GET,
      }),
      providesTags: ['BestVendor'],
    }),
    followVendor: build.mutation<
      IFollower,
      { body: { buyerId: string; vendorId: string } }
    >({
      query: ({ body }) => ({
        url: `/vendors/follow`,
        method: HttpMethods.POST,
        body,
      }),
      invalidatesTags: ['BestVendor'],
    }),
    unfollowVendor: build.mutation<
      void,
      { body: { buyerId: string; vendorId: string } }
    >({
      query: ({ body }) => ({
        url: `/vendors/unfollow`,
        method: HttpMethods.DELETE,
        body,
      }),
      invalidatesTags: ['BestVendor'],
    }),
  }),
});

export const {
  useGetBestVendorsQuery,
  useFollowVendorMutation,
  useUnfollowVendorMutation,
} = bestVendorsApi;

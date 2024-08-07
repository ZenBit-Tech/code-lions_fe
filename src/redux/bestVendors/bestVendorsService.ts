import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';
import { RootState } from 'src/common/types';
import { IProductFilters } from 'src/redux/product/types';

import { IBestVendor, IFollower } from './types';

export const bestVendorsApi = createApi({
  reducerPath: 'bestVendorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).user;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['BestVendor'],
  endpoints: (build) => ({
    getBestVendors: build.query<IBestVendor[], IProductFilters>({
      query: (filters) => ({
        url: RTKUrls.BEST_VENDORS,
        method: HttpMethods.GET,
        params: { ...filters },
      }),
      providesTags: ['BestVendor'],
    }),
    followVendor: build.mutation<IFollower, { body: { vendorId: string } }>({
      query: ({ body }) => ({
        url: RTKUrls.FOLLOW_VENDOR,
        method: HttpMethods.POST,
        body,
      }),
      invalidatesTags: ['BestVendor'],
    }),
    unfollowVendor: build.mutation<void, { body: { vendorId: string } }>({
      query: ({ body }) => ({
        url: RTKUrls.UNFOLLOW_VENDOR,
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

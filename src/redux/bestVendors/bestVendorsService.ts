import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';

import { IBestVendor } from './types';

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
  }),
});

export const { useGetBestVendorsQuery } = bestVendorsApi;

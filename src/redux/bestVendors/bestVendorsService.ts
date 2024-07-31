import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, apiUrl } from 'src/common/constants';
import { IProductFilters } from 'src/redux/product/types';

import { IBestVendor } from './types';

export const bestVendorsApi = createApi({
  reducerPath: 'bestVendorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
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
  }),
});

export const { useGetBestVendorsQuery } = bestVendorsApi;

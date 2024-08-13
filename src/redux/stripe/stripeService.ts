import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { baseQueryWithReauth } from 'src/redux/user/userService';

export const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getApplicationFee: build.query<number, void>({
      query: () => ({
        url: `${RTKUrls.STRIPE}/application-fee`,
        method: HttpMethods.GET,
      }),
    }),
    updateApplicationFee: build.mutation<void, { applicationFee: number }>({
      query: ({ applicationFee }) => ({
        url: `${RTKUrls.STRIPE}/application-fee`,
        method: HttpMethods.PATCH,
        body: { applicationFee },
      }),
    }),
  }),
});

export const { useGetApplicationFeeQuery, useUpdateApplicationFeeMutation } =
  stripeApi;

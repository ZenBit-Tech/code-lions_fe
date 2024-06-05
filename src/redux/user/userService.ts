import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://code-lions-be.onrender.com/auth',
  }),
  endpoints: (build) => ({
    verifyEmail: build.mutation({
      query: (post) => ({
        url: '/verify-otp',
        method: 'POST',
        body: post,
      }),
    }),
    resendOtp: build.mutation({
      query: (post) => ({
        url: '/resend-otp',
        method: 'POST',
        body: post,
      }),
    }),
  }),
});

export const { useVerifyEmailMutation, useResendOtpMutation } = userApi;

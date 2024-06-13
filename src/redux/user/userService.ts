import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';

import {
  IVerifyEmailRequest,
  IVerifyEmailResponse,
  IResendOtpRequest,
  IRegisterUserRequest,
  IRegisterUserResponse,
} from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (build) => ({
    verifyEmail: build.mutation<IVerifyEmailResponse, IVerifyEmailRequest>({
      query: (post) => ({
        url: RTKUrls.VERIFY_OTP,
        method: HttpMethods.POST,
        body: post,
      }),
    }),
    resendOtp: build.mutation<void, IResendOtpRequest>({
      query: (post) => ({
        url: RTKUrls.RESEND_OTP,
        method: HttpMethods.POST,
        body: post,
      }),
    }),
    userSignUp: build.mutation<IRegisterUserResponse, IRegisterUserRequest>({
      query: (newUser) => ({
        url: RTKUrls.REGISTER_USER,
        method: HttpMethods.POST,
        body: newUser,
      }),
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  useResendOtpMutation,
  useUserSignUpMutation,
} = userApi;

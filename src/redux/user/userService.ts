import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import {
  IVerifyEmailRequest,
  IVerifyEmailResponse,
  IResendOtpRequest,
  IRegisterUserRequest,
  IRegisterUserResponse,
  IRegisterGoogleResponse,
  IRegisterGoogleRequest,
  ILoginResponse,
  ILoginRequest,
  IForgotPasswordRequest,
  IResetPasswordResponse,
  IResetPasswordRequest,
  INewPasswordRequest,
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
      query: (post) => ({
        url: RTKUrls.REGISTER_USER,
        method: HttpMethods.POST,
        body: post,
      }),
    }),
    addUserGoogle: build.mutation<
      IRegisterGoogleResponse,
      IRegisterGoogleRequest
    >({
      query: (post) => ({
        url: RTKUrls.GOOGLE_AUTH,
        method: HttpMethods.POST,
        body: post,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }),
    }),
    loginUser: build.mutation<ILoginResponse, ILoginRequest>({
      query: (post) => ({
        url: RTKUrls.SIGN_IN,
        method: HttpMethods.POST,
        body: post,
      }),
    }),
    forgotPassword: build.mutation<void, IForgotPasswordRequest>({
      query: (post) => ({
        url: RTKUrls.FORGOT_PASSWORD,
        method: HttpMethods.POST,
        body: post,
      }),
    }),
    resetPassword: build.mutation<
      IResetPasswordResponse,
      IResetPasswordRequest
    >({
      query: (post) => ({
        url: RTKUrls.RESET_PASSWORD,
        method: HttpMethods.POST,
        body: post,
      }),
    }),
    newPassword: build.mutation<void, INewPasswordRequest>({
      query: (post) => ({
        url: RTKUrls.NEW_PASSWORD,
        method: HttpMethods.POST,
        body: post,
      }),
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  useResendOtpMutation,
  useUserSignUpMutation,
  useAddUserGoogleMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useNewPasswordMutation,
} = userApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginDto, ILoginResponse, IResetPasswordDto, IUserWithTokensDto } from 'src/redux/types/user';
import { HttpMethods, RTKUrls } from "src/common/constants";
import { IForgotPasswordDto, IForgotPasswordResponse } from "src/redux/types/email";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginDto>({
      query: (credentials) => ({
        url: RTKUrls.SIGN_IN,
        method: HttpMethods.POST,
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<IForgotPasswordResponse, IForgotPasswordDto>({
      query: (data) => ({
        url: RTKUrls.FORGOT_PASSWORD,
        method: HttpMethods.POST,
        body: data,
      }),
    }),
    resetPassword: builder.mutation<IUserWithTokensDto, IResetPasswordDto>({
      query: (data) => ({
        url: RTKUrls.RESET_PASSWORD,
        method: HttpMethods.POST,
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;

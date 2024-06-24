import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { RootState } from 'src/redux/store';

import {
  IVerifyEmailRequest,
  IResendOtpRequest,
  IRegisterUserRequest,
  IRegisterUserResponse,
  IRegisterGoogleRequest,
  ILoginRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  INewPasswordRequest,
  IUser,
  IUserDataResponse,
  IAdminUsersRequest,
  IAdminUser,
  IUpdateUserByAdminRequest,
} from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).user;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    verifyEmail: build.mutation<IUser, IVerifyEmailRequest>({
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
    addUserGoogle: build.mutation<IUser, IRegisterGoogleRequest>({
      query: (post) => ({
        url: RTKUrls.GOOGLE_AUTH,
        method: HttpMethods.POST,
        body: post,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }),
    }),
    loginUser: build.mutation<IUser, ILoginRequest>({
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
    resetPassword: build.mutation<IUser, IResetPasswordRequest>({
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
    getAllUsers: build.query<IUserDataResponse, IAdminUsersRequest>({
      query: ({ page, order, role, search }) => ({
        url: RTKUrls.ADMIN_USERS,
        method: HttpMethods.GET,
        params: { page, order, role, search },
      }),
      providesTags: (result) => (result ? [{ type: 'User', id: 'LIST' }] : []),
    }),
    getUserById: build.query<IAdminUser, { userId: string }>({
      query: ({ userId }) => ({
        url: `${RTKUrls.ADMIN_USERS}/${userId}`,
        method: HttpMethods.GET,
      }),
    }),
    updateUserProfileByAdmin: build.mutation<
      IAdminUser,
      { userId: string; updateProfileByAdminDto: IUpdateUserByAdminRequest }
    >({
      query: ({ userId, updateProfileByAdminDto }) => ({
        url: `${RTKUrls.USERS}/${userId}/${RTKUrls.UPDATE_PROFILE_ADMIN}`,
        method: HttpMethods.PATCH,
        body: updateProfileByAdminDto,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    deleteUserByAdmin: build.mutation<void, { userId: string }>({
      query: ({ userId }) => ({
        url: `${RTKUrls.USERS}/${userId}/${RTKUrls.SOFT_DELETE}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
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
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileByAdminMutation,
  useDeleteUserByAdminMutation,
} = userApi;

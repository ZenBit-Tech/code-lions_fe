import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls, httpStatusCodes } from 'src/common/constants';
import { RootState } from 'src/redux/store';
import { setTokens, logout } from 'src/redux/user/userSlice';

import {
  IVerifyEmailRequest,
  IResendOtpRequest,
  IRegisterUserRequest,
  IRegisterGoogleRequest,
  ILoginRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  INewPasswordRequest,
  IUser,
  IUserDataResponse,
  IAdminUsersRequest,
  IUpdateRoleRequest,
  IUploadPhotoRequest,
  IUpdatePhoneRequest,
  IUpdateAddressRequest,
  IUpdateCreditCardRequest,
  IUpdateSizesRequest,
  IUpdatePersonalInfoRequest,
} from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).user;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === httpStatusCodes.UNAUTHORIZED) {
    const state = api.getState() as RootState;
    const { refreshToken } = state.user;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: RTKUrls.REFRESH_TOKEN,
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setTokens(refreshResult.data));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
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

    userSignUp: build.mutation<IUser, IRegisterUserRequest>({
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

    updateRole: build.mutation<IUser, IUpdateRoleRequest>({
      query: (user) => ({
        url: `${RTKUrls.USERS}/${user.id}/${RTKUrls.ROLE}`,
        method: HttpMethods.PATCH,
        body: { role: user.role },
      }),
    }),

    uploadPhoto: build.mutation<IUser, IUploadPhotoRequest>({
      query: ({ id, photo }) => ({
        url: `${RTKUrls.USERS}/${id}/${RTKUrls.PHOTO}`,
        method: HttpMethods.POST,
        body: photo,
      }),
    }),

    updatePhone: build.mutation<IUser, IUpdatePhoneRequest>({
      query: (user) => ({
        url: `${RTKUrls.USERS}/${user.id}/${RTKUrls.PHONE}`,
        method: HttpMethods.PATCH,
        body: { phoneNumber: user.phone },
      }),
    }),

    updateAddress: build.mutation<IUser, IUpdateAddressRequest>({
      query: ({ id, ...rest }) => ({
        url: `${RTKUrls.USERS}/${id}/${RTKUrls.ADDRESS}`,
        method: HttpMethods.PATCH,
        body: rest,
      }),
    }),

    updateCreditCard: build.mutation<IUser, IUpdateCreditCardRequest>({
      query: ({ id, ...rest }) => ({
        url: `${RTKUrls.USERS}/${id}/${RTKUrls.CREDIT_CARD}`,
        method: HttpMethods.PATCH,
        body: rest,
      }),
    }),

    updateSizes: build.mutation<IUser, IUpdateSizesRequest>({
      query: ({ id, ...rest }) => ({
        url: `${RTKUrls.USERS}/${id}/${RTKUrls.SIZE}`,
        method: HttpMethods.PATCH,
        body: rest,
      }),
    }),

    getAllUsers: build.query<IUserDataResponse, IAdminUsersRequest>({
      query: ({ page, order, role, search }) => ({
        url: RTKUrls.ADMIN_USERS,
        method: HttpMethods.GET,
        params: { page, order, role, search },
      }),
    }),

    updatePersonalInfo: build.mutation<IUser, IUpdatePersonalInfoRequest>({
      query: ({ id, ...rest }) => ({
        url: `${RTKUrls.USERS}/${id}${RTKUrls.UPDATE_PROFILE}`,
        method: HttpMethods.PATCH,
        body: rest,
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
  useUpdateRoleMutation,
  useUploadPhotoMutation,
  useUpdatePhoneMutation,
  useUpdateAddressMutation,
  useUpdateCreditCardMutation,
  useUpdateSizesMutation,
  useGetAllUsersQuery,
  useUpdatePersonalInfoMutation,
} = userApi;

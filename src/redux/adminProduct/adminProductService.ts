import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  apiUrl,
  HttpMethods,
  RTKUrls,
  httpStatusCodes,
} from 'src/common/constants.ts';
import { RootState } from 'src/redux/store';
import { setTokens, logout } from 'src/redux/user/userSlice';

import { IRefreshTokenResponse } from '../user/types';

import {
  IAdminProductsResponse,
  IAdminProductsRequest,
  IAdminEditProductRequest,
} from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).user;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (
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
        api.dispatch(setTokens(refreshResult.data as IRefreshTokenResponse));
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

export const adminProductsApi = createApi({
  reducerPath: 'adminProductsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AdminProduct'],
  endpoints: (build) => ({
    getAllProducts: build.query<IAdminProductsResponse, IAdminProductsRequest>({
      query: ({ list, page, sortOrder, search }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN}/${list}`,
        method: HttpMethods.GET,
        params: { page, sortOrder, search },
      }),
      providesTags: (result) =>
        result ? [{ type: 'AdminProduct', id: 'LIST' }] : [],
    }),
    approveProduct: build.mutation<void, IAdminEditProductRequest>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN_APPROVE}/${productId}`,
        method: HttpMethods.PATCH,
        body: { productId },
      }),
      invalidatesTags: [{ type: 'AdminProduct', id: 'LIST' }],
    }),
    rejectProduct: build.mutation<void, IAdminEditProductRequest>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN_REJECT}/${productId}`,
        method: HttpMethods.PATCH,
        body: { productId },
      }),
      invalidatesTags: [{ type: 'AdminProduct', id: 'LIST' }],
    }),
    deleteProduct: build.mutation<void, IAdminEditProductRequest>({
      query: ({ productId }) => ({
        url: `${RTKUrls.PRODUCTS_ADMIN_APPROVE}/${productId}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [{ type: 'AdminProduct', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useApproveProductMutation,
  useRejectProductMutation,
  useDeleteProductMutation,
} = adminProductsApi;

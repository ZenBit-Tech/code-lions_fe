import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  HttpMethods,
  RTKUrls,
  apiUrl,
  httpStatusCodes,
} from 'src/common/constants';
import { RootState } from 'src/redux/store';
import { IRefreshTokenResponse } from 'src/redux/user/types';
import { setTokens, logout } from 'src/redux/user/userSlice';

import { ICartItem } from './types';

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
          method: HttpMethods.POST,
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

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart'],
  endpoints: (build) => ({
    getCartById: build.query<ICartItem[], { userId: string }>({
      query: ({ userId }) => ({
        url: `${RTKUrls.CART}/${userId}`,
        method: HttpMethods.GET,
        params: { id: userId },
      }),
      providesTags: ['Cart'],
    }),

    addToCart: build.mutation<
      void,
      { userId: string; productId: string; duration: number; price: number }
    >({
      query: ({ userId, productId, duration, price }) => ({
        url: `${RTKUrls.CART}/${userId}`,
        method: HttpMethods.POST,
        body: { productId, duration, price },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeFromCart: build.mutation<void, { userId: string; productId: string }>(
      {
        query: ({ userId, productId }) => ({
          url: `${RTKUrls.CART}/${userId}`,
          method: HttpMethods.DELETE,
          body: { productId },
        }),
        invalidatesTags: ['Cart'],
      }
    ),
  }),
});

export const {
  useGetCartByIdQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;

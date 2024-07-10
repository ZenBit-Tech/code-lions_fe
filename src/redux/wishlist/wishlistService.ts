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
import { IProduct } from 'src/redux/product/types';
import { RootState } from 'src/redux/store';
import { IRefreshTokenResponse } from 'src/redux/user/types';
import { setTokens, logout } from 'src/redux/user/userSlice';

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

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Wishlist'],
  endpoints: (build) => ({
    getWishlistById: build.query<IProduct[], { userId: string }>({
      query: ({ userId }) => ({
        url: `${RTKUrls.WISHLIST}/${userId}`,
        method: HttpMethods.GET,
        params: { id: userId },
      }),
      providesTags: ['Wishlist'],
    }),

    addToWishlist: build.mutation<void, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `${RTKUrls.WISHLIST}/${userId}`,
        method: HttpMethods.POST,
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),

    removeFromWishlist: build.mutation<
      void,
      { userId: string; productId: string }
    >({
      query: ({ userId, productId }) => ({
        url: `${RTKUrls.WISHLIST}/${userId}`,
        method: HttpMethods.DELETE,
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetWishlistByIdQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;

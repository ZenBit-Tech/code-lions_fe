import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { IProduct } from 'src/redux/product/types';
import { baseQueryWithReauth } from 'src/redux/user/userService';

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

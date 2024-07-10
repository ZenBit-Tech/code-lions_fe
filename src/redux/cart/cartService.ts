import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { baseQueryWithReauth } from 'src/redux/user/userService';

import { ICartItem } from './types';

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

import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'src/redux/product/types';
import { logout } from 'src/redux/user/userSlice';

import { wishlistApi } from './wishlistService';

const initialState: IProduct[] = [];

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      wishlistApi.endpoints.getWishlistById.matchFulfilled,
      (_state, action) => {
        return action.payload;
      }
    );
    builder.addMatcher(
      (action) => action.type === logout.type,
      () => initialState
    );
  },
});

export default wishlistSlice.reducer;

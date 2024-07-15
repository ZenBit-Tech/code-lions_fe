import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/redux/user/userSlice';

import { cartApi } from './cartService';
import { ICartItem } from './types';

const initialState: ICartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCartById.matchFulfilled,
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

export const selectCart = (state: { cart: ICartItem[] }) => state.cart;

export default cartSlice.reducer;

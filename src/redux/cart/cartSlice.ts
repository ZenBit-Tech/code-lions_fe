import { createSlice } from '@reduxjs/toolkit';

import { ICartItem } from './types';

const initialState: ICartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'src/redux/product/types';

const initialState: IProduct[] = [];

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
});

export default wishlistSlice.reducer;

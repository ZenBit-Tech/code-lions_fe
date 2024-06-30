import { createSlice } from '@reduxjs/toolkit';

import { IProduct } from './types';

const initialState: IProduct[] = [];

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice.reducer;

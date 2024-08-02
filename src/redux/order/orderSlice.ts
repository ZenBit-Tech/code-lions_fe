import { createSlice } from '@reduxjs/toolkit';

import { IOrder } from './types';

const initialState: IOrder[] = [];

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});

export default orderSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { IBestVendor } from './types';

const initialState: IBestVendor[] = [];

export const productSlice = createSlice({
  name: 'bestVendors',
  initialState,
  reducers: {},
});

export default productSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { IAddedProduct } from './types';

const initialState: IAddedProduct = {
  category: '',
  type: '',
  style: '',
};

export const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setStyle(state, action) {
      state.style = action.payload;
    },
  },
});

export const { setCategory, setType, setStyle } = addProductSlice.actions;

export default addProductSlice.reducer;

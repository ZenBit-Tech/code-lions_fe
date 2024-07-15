import { createSlice } from '@reduxjs/toolkit';

import { IAddedProduct } from './types';

const initialState: IAddedProduct = {
  category: '',
  type: '',
  style: '',
  name: '',
  description: '',
  brand: '',
  size: '',
  color: '',
  material: '',
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
    setName(state, action) {
      state.name = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setMaterial(state, action) {
      state.material = action.payload;
    },
  },
});

export const {
  setCategory,
  setType,
  setStyle,
  setName,
  setDescription,
  setBrand,
  setSize,
  setColor,
  setMaterial,
} = addProductSlice.actions;

export default addProductSlice.reducer;

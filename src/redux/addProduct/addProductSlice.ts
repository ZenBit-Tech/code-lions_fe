import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAddedProduct, IPhoto } from './types';

const initialState: IAddedProduct = {
  category: '',
  type: '',
  style: '',
  photos: [],
  step: 1,
};

export const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    setAddProductStep(state) {
      state.step = 1;
    },
    increaseAddProductStep(state) {
      state.step += 1;
    },
    decreaseAddProductStep(state) {
      state.step -= 1;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setStyle(state, action: PayloadAction<string>) {
      state.style = action.payload;
    },
    addPhoto(state, action: PayloadAction<IPhoto>) {
      state.photos.push(action.payload);
    },
    removePhoto(state, action: PayloadAction<string>) {
      state.photos = state.photos.filter(
        (photo) => photo.id !== action.payload
      );
    },
    setPrimaryPhoto(state, action: PayloadAction<string>) {
      state.photos.forEach((photo) => {
        photo.isPrimary = photo.id === action.payload;
      });
    },
  },
});

export const {
  setCategory,
  setType,
  setStyle,
  addPhoto,
  removePhoto,
  setPrimaryPhoto,
  increaseAddProductStep,
  decreaseAddProductStep,
  setAddProductStep,
} = addProductSlice.actions;

export const selectAddProductStep = (state: { addProduct: IAddedProduct }) =>
  state.addProduct.step;

export default addProductSlice.reducer;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

import { IAddedProduct, ProductImage } from './types';

const initialState: IAddedProduct = {
  id: 'new',
  category: '',
  type: '',
  style: '',
  images: [],
  price: 0,
  step: 1,
};

export const fetchProductImages = createAsyncThunk(
  'addProduct/fetchProductImages',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { images } = state.addProduct;

    return images;
  }
);

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
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    addPhoto(state, action: PayloadAction<ProductImage>) {
      state.images.push(action.payload);
    },
    removePhoto(state, action: PayloadAction<string>) {
      state.images = state.images.filter(
        (image) => image.src !== action.payload
      );
    },
    setPrimaryPhoto(state, action: PayloadAction<string>) {
      state.images = state.images.map((image) =>
        image.src === action.payload
          ? { ...image, isPrimary: true }
          : { ...image, isPrimary: false }
      );
    },
    resetAddProduct(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
  },
});

export const {
  setId,
  setCategory,
  setType,
  setStyle,
  setPrice,
  addPhoto,
  removePhoto,
  setPrimaryPhoto,
  increaseAddProductStep,
  decreaseAddProductStep,
  setAddProductStep,
  resetAddProduct,
} = addProductSlice.actions;

export const selectAddProductStep = (state: { addProduct: IAddedProduct }) =>
  state.addProduct.step;

export const selectProductImages = (state: RootState) =>
  state.addProduct.images;

export const selectProductId = (state: RootState) => state.addProduct.id;

export default addProductSlice.reducer;

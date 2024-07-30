import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'src/common/types';

import { IAddedProduct, ProductImage } from './types';

const initialState: IAddedProduct = {
  id: 'new',
  categories: [],
  type: '',
  style: '',
  name: '',
  description: '',
  brand: '',
  size: '',
  colors: [],
  material: '',
  pdfUrl: '',
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
      state.categories = [];
      state.categories.push(action.payload);
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setStyle(state, action: PayloadAction<string>) {
      state.style = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setBrand(state, action: PayloadAction<string>) {
      state.brand = action.payload;
    },
    setSize(state, action: PayloadAction<string>) {
      state.size = action.payload;
    },
    setColor(state, action: PayloadAction<string>) {
      state.colors = [];
      state.colors.push(action.payload);
    },
    setMaterial(state, action: PayloadAction<string>) {
      state.material = action.payload;
    },
    setPdfUrl(state, action: PayloadAction<string>) {
      state.pdfUrl = action.payload;
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
    addPhotos(state, action: PayloadAction<ProductImage[]>) {
      state.images = action.payload;
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
  setName,
  setDescription,
  setBrand,
  setSize,
  setColor,
  setMaterial,
  setPdfUrl,
  setPrice,
  addPhoto,
  addPhotos,
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

import { createSlice } from '@reduxjs/toolkit';

import { IProductFilters } from './types';

const initialState: IProductFilters = {
  selectedPrice: 0,
  selectedColor: '',
  selectedSize: '',
  selectedStyle: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceFilter(state, action) {
      state.selectedPrice = action.payload;
    },
    setColorFilter(state, action) {
      state.selectedColor = action.payload;
    },
    setSizeFilter(state, action) {
      state.selectedSize = action.payload;
    },
    setStyleFilter(state, action) {
      state.selectedStyle = action.payload;
    },
  },
});
export const { setPriceFilter, setColorFilter, setSizeFilter, setStyleFilter } =
  filtersSlice.actions;

export default filtersSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
const exampleReducer = counterSlice.reducer;
export default exampleReducer;

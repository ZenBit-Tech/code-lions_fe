import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';

const store = configureStore({
  reducer: {
    counter: exampleReducer,
  },
});

export default store;

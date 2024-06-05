import { configureStore } from '@reduxjs/toolkit';

import { apiUserSlice } from './apiUserSlice';

const store = configureStore({
  reducer: {
    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUserSlice.middleware),
});

export default store;

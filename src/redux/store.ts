import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { bestVendorsApi } from './bestVendors/bestVendorsService';
import bestVendorsReducer from './bestVendors/bestVendorsSlice';
import filtersReducer from './filters/filtersSlice';
import { productApi } from './product/productService';
import productReducer from './product/productSlice';
import { userApi } from './user/userService';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  filters: filtersReducer,
  bestVendors: bestVendorsReducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [bestVendorsApi.reducerPath]: bestVendorsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'filters'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userApi.middleware,
      productApi.middleware,
      bestVendorsApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

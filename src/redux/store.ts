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

import { addProductApi } from './addProduct/addProductService';
import addProductReducer from './addProduct/addProductSlice';
import { adminProductsApi } from './adminProduct/adminProductService';
import { bestVendorsApi } from './bestVendors/bestVendorsService';
import bestVendorsReducer from './bestVendors/bestVendorsSlice';
import { cartApi } from './cart/cartService';
import cartReducer from './cart/cartSlice';
import { chatApi } from './chat/chatService';
import chatReducer from './chat/chatSlice';
import { orderApi } from './order/orderService';
import orderReducer from './order/orderSlice';
import { productApi } from './product/productService';
import productReducer from './product/productSlice';
import { userApi } from './user/userService';
import userReducer from './user/userSlice';
import { vendorProductsApi } from './vendorProduct/vendorProductService';
import { wishlistApi } from './wishlist/wishlistService';
import wishlistReducer from './wishlist/wishlistSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  bestVendors: bestVendorsReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  addProduct: addProductReducer,
  chat: chatReducer,
  order: orderReducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [bestVendorsApi.reducerPath]: bestVendorsApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [addProductApi.reducerPath]: addProductApi.reducer,
  [adminProductsApi.reducerPath]: adminProductsApi.reducer,
  [vendorProductsApi.reducerPath]: vendorProductsApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'wishlist', 'cart', 'addProduct'],
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
      bestVendorsApi.middleware,
      wishlistApi.middleware,
      cartApi.middleware,
      addProductApi.middleware,
      adminProductsApi.middleware,
      vendorProductsApi.middleware,
      chatApi.middleware,
      orderApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default store;

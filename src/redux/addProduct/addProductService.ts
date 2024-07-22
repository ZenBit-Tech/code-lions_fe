import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants.ts';
import { baseQueryWithReauth } from 'src/redux/user/userService';

import {
  IUploadProductPhotoRequest,
  IProduct,
  IDeleteProductPhotoRequest,
} from './types';

export const addProductApi = createApi({
  reducerPath: 'addProductApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AddProduct'],
  endpoints: (build) => ({
    uploadProductPhoto: build.mutation<IProduct, IUploadProductPhotoRequest>({
      query: ({ photo }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}`,
        method: HttpMethods.POST,
        body: photo,
      }),
    }),
    deleteProductPhoto: build.mutation<IProduct, IDeleteProductPhotoRequest>({
      query: ({ url }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}?file=${encodeURIComponent(url)}`,
        method: HttpMethods.DELETE,
      }),
    }),
    setProductPhotoPrimary: build.mutation<
      IProduct,
      IDeleteProductPhotoRequest
    >({
      query: ({ url }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}/${RTKUrls.PRIMARY}`,
        method: HttpMethods.PATCH,
        body: url,
      }),
    }),
  }),
});

export const {
  useUploadProductPhotoMutation,
  useDeleteProductPhotoMutation,
  useSetProductPhotoPrimaryMutation,
} = addProductApi;

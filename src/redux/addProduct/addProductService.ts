import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl, HttpMethods, RTKUrls } from 'src/common/constants.ts';

import { IUploadProductPhotoRequest, IProduct } from './types';

export const addProductApi = createApi({
  reducerPath: 'addProductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['AddProduct'],
  endpoints: (build) => ({
    uploadProductPhoto: build.mutation<IProduct, IUploadProductPhotoRequest>({
      query: ({ photo }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}`,
        method: HttpMethods.POST,
        body: photo,
      }),
    }),
    deleteProductPhoto: build.mutation<IProduct, IUploadProductPhotoRequest>({
      query: ({ photo }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}`,
        method: HttpMethods.DELETE,
        body: photo,
      }),
    }),
    setProductPhotoPrimary: build.mutation<
      IProduct,
      IUploadProductPhotoRequest
    >({
      query: ({ photo }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}/${RTKUrls.PRIMARY}`,
        method: HttpMethods.PATCH,
        body: photo,
      }),
    }),
  }),
});

export const {
  useUploadProductPhotoMutation,
  useDeleteProductPhotoMutation,
  useSetProductPhotoPrimaryMutation,
} = addProductApi;

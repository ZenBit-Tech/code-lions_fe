import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants.ts';
import { baseQueryWithReauth } from 'src/redux/user/userService';

import {
  IUploadProductPhotoRequest,
  IProduct,
  IDeleteProductPhotoRequest,
  IUpdateProductRequest,
  IUploadProductPdfRequest,
} from './types';

export const addProductApi = createApi({
  reducerPath: 'addProductApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AddProduct'],
  endpoints: (build) => ({
    uploadProductPhoto: build.mutation<IProduct, IUploadProductPhotoRequest>({
      query: ({ id, photo }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}/${RTKUrls.PHOTO}`,
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
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}/${RTKUrls.PRIMARY}?file=${encodeURIComponent(url)}`,
        method: HttpMethods.PATCH,
      }),
    }),
    updateProduct: build.mutation<IProduct, IUpdateProductRequest>({
      query: ({ id, data }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}`,
        method: HttpMethods.PATCH,
        body: data,
      }),
    }),
    uploadProductPdf: build.mutation<IProduct, IUploadProductPdfRequest>({
      query: ({ id, file }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}/${RTKUrls.FILE}`,
        method: HttpMethods.POST,
        body: file,
      }),
    }),
  }),
});

export const {
  useUploadProductPhotoMutation,
  useDeleteProductPhotoMutation,
  useSetProductPhotoPrimaryMutation,
  useUpdateProductMutation,
  useUploadProductPdfMutation,
} = addProductApi;

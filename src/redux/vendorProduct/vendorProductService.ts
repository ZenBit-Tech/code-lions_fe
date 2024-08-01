import { createApi } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants.ts';

import {
  IDeleteProductPhotoRequest,
  IProduct,
  IUpdateProductRequest,
  IUploadProductPdfRequest,
  IUploadProductPhotoRequest,
} from '../addProduct/types';
import { baseQueryWithReauth } from '../user/userService';

import {
  IVendorProductsRequest,
  IVendorProductsResponse,
  IVendorDeleteProductRequest,
} from './types';

export const vendorProductsApi = createApi({
  reducerPath: 'vendorProductsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['VendorProduct'],
  endpoints: (build) => ({
    getAllProductsVendor: build.query<
      IVendorProductsResponse,
      IVendorProductsRequest
    >({
      query: ({ id, page, sortOrder, search }) => ({
        url: `${RTKUrls.PRODUCTS_VENDOR}/${id}`,
        method: HttpMethods.GET,
        params: { page, sortOrder, search },
      }),
      providesTags: (result) =>
        result ? [{ type: 'VendorProduct', id: 'LIST' }] : [],
    }),
    deleteProductVendor: build.mutation<void, IVendorDeleteProductRequest>({
      query: ({ productId, id }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}/${productId}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [{ type: 'VendorProduct', id: 'LIST' }],
    }),
    uploadProductPhoto: build.mutation<IProduct, IUploadProductPhotoRequest>({
      query: ({ id, photo }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}/${RTKUrls.PHOTO}`,
        method: HttpMethods.POST,
        body: photo,
      }),
      invalidatesTags: ['VendorProduct'],
    }),
    deleteProductPhoto: build.mutation<IProduct, IDeleteProductPhotoRequest>({
      query: ({ url }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}?file=${encodeURIComponent(url)}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: ['VendorProduct'],
    }),
    setProductPhotoPrimary: build.mutation<
      IProduct,
      IDeleteProductPhotoRequest
    >({
      query: ({ url }) => ({
        url: `${RTKUrls.PRODUCTS}/${RTKUrls.PHOTO}/${RTKUrls.PRIMARY}?file=${encodeURIComponent(url)}`,
        method: HttpMethods.PATCH,
      }),
      invalidatesTags: ['VendorProduct'],
    }),
    updateProduct: build.mutation<IProduct, IUpdateProductRequest>({
      query: ({ id, data }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}`,
        method: HttpMethods.PATCH,
        body: data,
      }),
      invalidatesTags: ['VendorProduct'],
    }),
    uploadProductPdf: build.mutation<IProduct, IUploadProductPdfRequest>({
      query: ({ id, file }) => ({
        url: `${RTKUrls.PRODUCTS}/${id}/${RTKUrls.FILE}`,
        method: HttpMethods.POST,
        body: file,
      }),
      invalidatesTags: ['VendorProduct'],
    }),
  }),
});

export const {
  useGetAllProductsVendorQuery,
  useDeleteProductVendorMutation,
  useUploadProductPhotoMutation,
  useDeleteProductPhotoMutation,
  useSetProductPhotoPrimaryMutation,
  useUpdateProductMutation,
  useUploadProductPdfMutation,
} = vendorProductsApi;

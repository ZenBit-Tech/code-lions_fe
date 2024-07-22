import { ProductStatus } from 'redux/product/types.ts';

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  categories: string;
  style: string;
  material: string;
  type: string;
  size: string;
  images: string[];
  colors: string;
  vendor: {
    id: string;
    name: string;
    photoUrl: string;
  };
  status: ProductStatus;
  createdAt: string;
  lastUpdatedAt: string;
  deletedAt: string;
  brand: string;
}

export interface IUpdateProductRequest {
  id: string;
  data: {
    name?: string;
    description?: string;
    price?: number;
    size?: string;
    brand?: string;
    colors?: string[];
    material?: string;
    categories?: string[];
    style?: string;
    type?: string;
  };
}

export interface IAddedProduct {
  id: string;
  category: string;
  type: string;
  style: string;
  images: ProductImage[];
  price: number;
  step: number;
}

export interface IUploadProductPhotoRequest {
  photo: FormData;
}

export interface IDeleteProductPhotoRequest {
  url: string;
}

export interface ProductImage {
  type: string;
  src: string;
  isPrimary: boolean;
}

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

export interface IAddedProduct {
  category: string;
  type: string;
  style: string;
  photos: string[];
  step: number;
}

export interface IUploadProductPhotoRequest {
  photo: FormData;
}

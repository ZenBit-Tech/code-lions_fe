import { ProductStatus } from 'redux/product/types.ts';

export interface IPhoto {
  id: string;
  url: string;
  isPrimary: boolean;
  createdAt: Date;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  categories: string[];
  style: string;
  type: string;
  size: string;
  images: IPhoto[];
  colors: string[];
  vendor: {
    id: string;
    name: string;
    photoUrl: string;
  };
  status: ProductStatus;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface IAddedProduct {
  category: string;
  type: string;
  style: string;
  photos: IPhoto[];
  step: number;
}

export interface IUploadProductPhotoRequest {
  photo: FormData;
}

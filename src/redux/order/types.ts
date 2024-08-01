import { ProductStatus } from 'src/redux/product/types';

export interface IOrder {
  id: string;
  orderId: number;
  price: string;
  createdAt: string;
  shipping: number;
  status: string;
  products: IOrderProduct[];
}

interface Image {
  id: string;
  isPrimary: boolean;
  url: string;
  createdAt: string;
}

export interface IAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
}

export interface IOrderProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  categories: string[];
  style: string;
  type: string;
  size: string;
  brand: string;
  material: string;
  images: Image[];
  colors: string[];
  vendor: {
    id: string;
    name: string;
    photoUrl: string;
  };
  status: ProductStatus;
  pdfUrl: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface IOrderData {
  order: IOrder[];
  userName: string;
  userId: string;
  address: IAddress;
}

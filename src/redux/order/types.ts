import { ProductStatus } from 'src/redux/product/types';

import { SortOrder } from '../user/types';

export interface IOrder {
  id: string;
  orderId: number;
  vendorId: string;
  buyerId: string;
  price: string;
  createdAt: string;
  shipping: number;
  status: string;
  products: IOrderProduct[];
  trackingNumber: string | null;
  rejectedBy: string | null;
  rejectReason: string | null;
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

export type OrderStatus =
  | 'New Order'
  | 'Sent'
  | 'Delivered'
  | 'Received'
  | 'Sent back'
  | 'Overdue'
  | 'Returned'
  | 'Rejected';

export type Category =
  | 'clothing'
  | 'shoes'
  | 'bags'
  | 'accessories'
  | 'designers'
  | 'evental';

interface IVendorOrderItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  isProductCreationFinished?: boolean;
  slug: string;
  vendorId: string;
  categories: Category[];
  style: string;
  material: string;
  type: string;
  size: string;
  pdfUrl: string | null;
  status: ProductStatus;
  createdAt: string;
  lastUpdatedAt: string;
  deletedAt: string | null;
  isAvailable: boolean;
}

export interface IVendorOrder {
  id: string;
  orderId: number;
  shipping: string;
  price: string;
  status: OrderStatus;
  createdAt: string;
  products: IVendorOrderItem[];
}

export type IVendorOrdersResponse = IVendorOrder[];

export interface IVendorOrdersRequest {
  id: string;
}

export interface IVendorPaginatedOrdersRequest {
  status?: OrderStatus;
  page?: number;
  sortBy?: 'orderId' | 'price' | 'createdAt';
  sortOrder: SortOrder;
}

export interface IVendorPaginatedOrdersResponse {
  orders: IVendorOrder[];
  count: number;
}

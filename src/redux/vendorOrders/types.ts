import { ProductStatus } from '../product/types';

export type OrderStatus =
  | 'New order'
  | 'Sent'
  | 'Delivered'
  | 'Received'
  | 'Waiting for returning'
  | 'Returned'
  | 'Rejected';

export type Category =
  | 'clothing'
  | 'shoes'
  | 'bags'
  | 'accessories'
  | 'designers'
  | 'evental';

interface IOrderItem {
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

export interface IOrder {
  id: string;
  orderId: number;
  shipping: string;
  price: string;
  status: OrderStatus;
  createdAt: string;
  products: IOrderItem[];
}

export type IVendorOrdersResponse = IOrder[];

export interface IVendorOrdersRequest {
  id: string;
}

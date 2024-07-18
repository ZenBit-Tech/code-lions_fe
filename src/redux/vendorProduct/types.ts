import { IProduct } from '../product/types';
import { SortOrder } from '../user/types';

export interface IVendorProductsResponse {
  products: IProduct[];
  count: number;
}

export interface IVendorProductsRequest {
  id: string;
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: SortOrder;
}

export interface IVendorDeleteProductRequest {
  productId: string;
  id: string;
}

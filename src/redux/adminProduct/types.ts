import { IProduct, ProductStatus } from '../product/types';
import { SortOrder } from '../user/types';

export interface IAdminProductsResponse {
  products: IProduct[];
  count: number;
}

export interface IAdminProductsRequest {
  list: ProductStatus;
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: SortOrder;
}

export interface IAdminEditProductRequest {
  productId: string;
}

import { IProduct } from '../product/types';

export interface IVendorOrdersResponse {
  products: IProduct[];
  count: number;
}

export interface IVendorOrdersRequest {
  id: string;
}

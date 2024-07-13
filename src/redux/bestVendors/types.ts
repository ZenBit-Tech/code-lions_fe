import { IProduct } from '../product/types';

export interface IBestVendor {
  vendorId: string;
  vendorName: string;
  photoUrl: string;
  products: IProduct[];
}

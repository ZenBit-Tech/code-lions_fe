import { SortOrder, SortParameter } from 'src/components/shared/OrderSelector';

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
  images: string[];
  colors: string[];
  vendor: {
    id: string;
    name: string;
    photoUrl: string;
  };
  createdAt: string;
  lastUpdatedAt: string;
}

export interface IProductResponse {
  products: IProduct[];
  count: number;
}

export interface IProductRequest {
  page?: number;
  limit?: number;
  search?: string;
  filters?: IProductFilters;
  sortBy?: SortParameter;
  sortOrder?: SortOrder;
}

export interface IProductFilters {
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  style?: string;
  size?: string;
}

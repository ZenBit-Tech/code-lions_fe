interface IColor {
  id: number;
  color: string;
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
  images: string[];
  colors: IColor[];
  vendor: {
    id: string;
    name: string;
    photoUrl: string;
  };
  createdAt: string;
  lastUpdatedAt: string;
}

export interface IProducts {
  products: IProduct[];
  count: number;
}

export type ProductStatus = 'published' | 'inactive';

export interface IProductVendor {
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
  colors: IColor[];
  vendor: {
    id: string;
    name: string;
    photoUrl: string;
  };
  stock: number;
  status: ProductStatus;
  createdAt: string;
  lastUpdatedAt: string;
}

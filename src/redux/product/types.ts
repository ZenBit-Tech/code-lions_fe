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
  createdAt: Date;
  lastUpdatedAt: Date;
}

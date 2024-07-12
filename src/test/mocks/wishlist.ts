import { IProduct } from 'src/redux/product/types';

import allProducts from './allProducts';

const userId: string = '1';

interface IWishlist {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

const wishlist: IWishlist[] = [
  {
    id: '1',
    userId: '1',
    productId: '1',
    createdAt: '2022-01-01T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    productId: '2',
    createdAt: '2022-01-01T10:00:00Z',
  },
  {
    id: '3',
    userId: '2',
    productId: '3',
    createdAt: '2022-01-01T10:00:00Z',
  },
  {
    id: '4',
    userId: '3',
    productId: '4',
    createdAt: '2022-01-01T10:00:00Z',
  },
];

const userProductIds = new Set(
  wishlist
    .filter((item) => item.userId === userId)
    .map((item) => item.productId)
);

const wishlistItems: IProduct[] = allProducts.filter((product) =>
  userProductIds.has(product.id)
);

export default wishlistItems;

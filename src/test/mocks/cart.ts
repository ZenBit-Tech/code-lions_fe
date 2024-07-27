import { ICartItem } from 'src/redux/cart/types';

const userId: string = '1';

const cart: ICartItem[] = [
  {
    id: '1',
    userId: '1',
    productId: '1',
    vendorId: 'vendor1',
    vendorName: 'vendor1',
    name: 'Product 1',
    price: 19.99,
    productUrl: 'image1.jpg',
    color: 'Red',
    size: 'S',
    duration: 7,
    createdAt: '2022-01-01T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    productId: '2',
    vendorId: 'vendor2',
    vendorName: 'vendor2',
    name: 'Product 2',
    price: 19.99,
    productUrl: 'image1.jpg',
    color: 'Red',
    size: 'S',
    duration: 7,
    createdAt: '2022-01-01T10:00:00Z',
  },
  {
    id: '3',
    userId: '2',
    productId: '3',
    vendorId: 'vendor1',
    vendorName: 'vendor1',
    name: 'Product 3',
    price: 19.99,
    productUrl: 'image1.jpg',
    color: 'Red',
    size: 'S',
    duration: 7,
    createdAt: '2022-01-01T10:00:00Z',
  },
  {
    id: '4',
    userId: '2',
    productId: '4',
    vendorId: 'vendor1',
    vendorName: 'vendor1',
    name: 'Product 4',
    price: 19.99,
    productUrl: 'image1.jpg',
    color: 'Red',
    size: 'S',
    duration: 7,
    createdAt: '2022-01-01T10:00:00Z',
  },
];

const cartItems: ICartItem[] = cart.filter((item) => item.userId === userId);

export default cartItems;

import { IProduct } from 'src/redux/product/types';

const products: IProduct[] = [
  {
    id: '1rm07r7r-t98p-5q9q-8p59-33sq0p8s3219',
    name: 'Cool product',
    slug: 'cool-product',
    price: 120.2,
    description:
      'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    categories: ['clothing', 'designers'],
    style: 'casual',
    type: 'dress',
    size: 'M',
    images: [
      'https://example.com/images/big/408793385.jpg',
      'https://example.com/images/big/408793386.jpg',
    ],
    colors: ['black', 'white'],
    vendor: {
      id: '2rm07r7r-t98p-5q9q-8p59-33sq0p8s3219',
      name: 'Oscar Perez',
      photoUrl: '',
    },
    stock: 1,
    status: 'published' as const,
    createdAt: '2024-06-28T18:04:24.000Z',
    lastUpdatedAt: '2024-06-28T18:04:24.000Z',
  },
  {
    id: '1rm07r7r-t98p-5q9q-8p59-33sq0p8s3218',
    name: 'Cool product',
    slug: 'cool-product',
    price: 120.2,
    description:
      'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    categories: ['clothing', 'designers'],
    style: 'casual',
    type: 'dress',
    size: 'M',
    images: [
      'https://example.com/images/big/408793385.jpg',
      'https://example.com/images/big/408793386.jpg',
    ],
    colors: ['white', 'yellow'],
    vendor: {
      id: '2rm07r7r-t98p-5q9q-8p59-33sq0p8s3219',
      name: 'Oscar Perez',
      photoUrl: '',
    },
    stock: 1,
    status: 'inactive' as const,
    createdAt: '2024-06-28T18:04:24.000Z',
    lastUpdatedAt: '2024-06-28T18:04:24.000Z',
  },
];

export default products;

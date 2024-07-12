import { IProduct } from 'src/redux/product/types';

const productsBySizes: IProduct[] = [
  {
    id: '1',
    name: 'Product 1',
    slug: 'product-1',
    price: 19.99,
    description: 'Description for Product 1',
    categories: ['Category 1', 'Category 2'],
    style: 'Style 1',
    type: 'Type 1',
    size: 'M',
    images: ['image1.jpg', 'image2.jpg'],
    colors: ['Red', 'Blue'],
    vendor: {
      id: 'vendor1',
      name: 'Vendor 1',
      photoUrl: 'vendor1.jpg',
    },
    createdAt: '2024-07-07T10:00:00Z',
    lastUpdatedAt: '2024-07-07T10:00:00Z',
  },
  {
    id: '2',
    name: 'Product 2',
    slug: 'product-2',
    price: 29.99,
    description: 'Description for Product 2',
    categories: ['Category 3', 'Category 4'],
    style: 'Style 2',
    type: 'Type 2',
    size: '32',
    images: ['image3.jpg', 'image4.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-01-01T10:00:00Z',
    lastUpdatedAt: '2024-01-01T10:00:00Z',
  },
];

export default productsBySizes;

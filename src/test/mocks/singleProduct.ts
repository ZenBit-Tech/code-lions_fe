import { IProduct } from 'src/redux/product/types';

const singleProduct: IProduct = {
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
  colors: [{ id: 1, color: 'Red' }],
  vendor: {
    id: 'vendor1',
    name: 'Vendor 1',
    photoUrl: 'vendor1.jpg',
  },
  createdAt: '2022-01-01T10:00:00Z',
  lastUpdatedAt: '2022-02-01T10:00:00Z',
};

export default singleProduct;

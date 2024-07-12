import { screen } from '@testing-library/react';

import { IProduct } from 'src/redux/product/types';
import renderWithProviders from 'src/test/renderWithProviders';

import ProductCard from '.';

const mockProduct: IProduct = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  price: 99.99,
  description: 'This is a test product.',
  categories: ['TestCategory'],
  style: 'TestStyle',
  type: 'TestType',
  size: 'L',
  images: ['test-image.jpg'],
  colors: ['red'],
  vendor: {
    id: 'vendor1',
    name: 'Test Vendor',
    photoUrl: 'vendor-photo.jpg',
  },
  createdAt: '2023-01-01',
  lastUpdatedAt: '2023-01-01',
};

describe('ProductCard', () => {
  it('renders ProductCard with product data', () => {
    renderWithProviders(<ProductCard item={mockProduct} />);

    expect(screen.getByAltText('product')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test Vendor')).toBeInTheDocument();
  });
});

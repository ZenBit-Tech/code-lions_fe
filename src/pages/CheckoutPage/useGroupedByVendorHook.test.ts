import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ICartItem } from 'src/redux/cart/types';

import useGroupedByVendor from './useGroupedByVendorHook';

describe('useGroupedByVendor', () => {
  const testCartItems: ICartItem[] = [
    {
      id: '1',
      price: 20,
      productUrl: '',
      name: 'Product 1',
      size: '',
      color: '',
      duration: 0,
      userId: '',
      productId: '',
      vendorId: 'vendor1',
      vendorName: 'Vendor A',
      createdAt: '',
    },
    {
      id: '2',
      price: 30,
      productUrl: '',
      name: 'Product 2',
      size: '',
      color: '',
      duration: 0,
      userId: '',
      productId: '',
      vendorId: 'vendor2',
      vendorName: 'Vendor B',
      createdAt: '',
    },
    {
      id: '3',
      price: 25,
      productUrl: '',
      name: 'Product 3',
      size: '',
      color: '',
      duration: 0,
      userId: '',
      productId: '',
      vendorId: 'vendor1',
      vendorName: 'Vendor A',
      createdAt: '',
    },
  ];

  it('should group items by vendor name correctly', () => {
    const { result } = renderHook(() => useGroupedByVendor(testCartItems));

    const expectedGroupedEntries = [
      ['Vendor A', [testCartItems[0], testCartItems[2]]],
      ['Vendor B', [testCartItems[1]]],
    ];

    expect(result.current).toEqual(expectedGroupedEntries);
  });

  it('should return an empty array when there are no cart items', () => {
    const { result } = renderHook(() => useGroupedByVendor([]));

    expect(result.current).toEqual([]);
  });

  it('should group items correctly when all items are from the same vendor', () => {
    const sameVendorItems: ICartItem[] = [
      {
        id: '4',
        price: 15,
        productUrl: '',
        name: 'Product 4',
        size: '',
        color: '',
        duration: 0,
        userId: '',
        productId: '',
        vendorId: 'vendor3',
        vendorName: 'Vendor C',
        createdAt: '',
      },
      {
        id: '5',
        price: 35,
        productUrl: '',
        name: 'Product 5',
        size: '',
        color: '',
        duration: 0,
        userId: '',
        productId: '',
        vendorId: 'vendor3',
        vendorName: 'Vendor C',
        createdAt: '',
      },
    ];

    const { result } = renderHook(() => useGroupedByVendor(sameVendorItems));

    const expectedGroupedEntries = [['Vendor C', sameVendorItems]];

    expect(result.current).toEqual(expectedGroupedEntries);
  });
});

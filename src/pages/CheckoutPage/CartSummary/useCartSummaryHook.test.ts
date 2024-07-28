import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { shippingOption } from 'src/common/constants';
import { ICartItem } from 'src/redux/cart/types';

import useCartSummary from './useCartSummaryHook';

const FREESHIP = 50;
const EXPRESSSHIP = 80;

describe('useCartSummary', () => {
  const testCartItems: ICartItem[] = [
    {
      id: '1',
      price: 20,
      productUrl: '',
      name: '',
      size: '',
      color: '',
      duration: 0,
      userId: '',
      productId: '',
      vendorId: 'vendor1',
      vendorName: '',
      createdAt: '',
    },
    {
      id: '2',
      price: 30,
      productUrl: '',
      name: '',
      size: '',
      color: '',
      duration: 0,
      userId: '',
      productId: '',
      vendorId: 'vendor2',
      vendorName: '',
      createdAt: '',
    },
  ];

  it('should calculate subtotal and total correctly with free shipping', () => {
    const { result, rerender } = renderHook(
      ({ cartItems, shipping }) => useCartSummary(cartItems, shipping),
      {
        initialProps: {
          cartItems: testCartItems,
          shipping: shippingOption.FREE,
        },
      }
    );

    expect(result.current.subtotal).toBe(FREESHIP);
    expect(result.current.total).toBe(FREESHIP);

    rerender({ cartItems: testCartItems, shipping: shippingOption.EXPRESS });

    expect(result.current.subtotal).toBe(FREESHIP);
    expect(result.current.total).toBe(EXPRESSSHIP);
  });

  it('should update total when shipping option changes', () => {
    const { result, rerender } = renderHook(
      ({ cartItems, shipping }) => useCartSummary(cartItems, shipping),
      {
        initialProps: {
          cartItems: testCartItems,
          shipping: shippingOption.FREE,
        },
      }
    );

    expect(result.current.total).toBe(FREESHIP);

    rerender({ cartItems: testCartItems, shipping: shippingOption.EXPRESS });

    expect(result.current.total).toBe(EXPRESSSHIP);
  });
});

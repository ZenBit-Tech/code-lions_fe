import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { ICartItem } from 'src/redux/cart/types';

import useCartSummary from './useCartSummaryHook';

const FREESHIP = 50;
const EXPRESSSHIP = 65;

// Mock useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'checkoutPage.freeShipping':
          return 'Free Shipping';

        case 'checkoutPage.expressShipping':
          return 'Express Shipping';

        case 'checkoutPage.expressPrice':
          return '15';

        default:
          return key;
      }
    },
  }),
}));

describe('useCartSummary', () => {
  it('should calculate subtotal, shipping price, and total correctly', () => {
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
        vendorId: '',
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
        vendorId: '',
        createdAt: '',
      },
    ];

    const { result, rerender } = renderHook(
      ({ items, shipping }) => useCartSummary(items, shipping),
      {
        initialProps: { items: testCartItems, shipping: 'Free Shipping' },
      }
    );

    expect(result.current.subtotal).toBe(FREESHIP);
    expect(result.current.total).toBe(FREESHIP);

    rerender({ items: testCartItems, shipping: 'Express Shipping' });

    expect(result.current.subtotal).toBe(FREESHIP);
    expect(result.current.total).toBe(EXPRESSSHIP);
  });
});

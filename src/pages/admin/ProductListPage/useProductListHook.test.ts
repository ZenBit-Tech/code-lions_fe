import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import allProducts from 'src/test/mocks/allProducts';

import useProducts from './useProductListHook';

describe('useProducts', () => {
  it('should return products, count, and pagesCount correctly with data', () => {
    const data = {
      products: allProducts,
      count: 5,
    };

    const { result } = renderHook(() => useProducts({ data }));

    expect(result.current.products).toEqual(data.products);
    expect(result.current.count).toBe(data.count);
    expect(result.current.pagesCount).toBe(1);
  });

  it('should return default values when no data is provided', () => {
    const { result } = renderHook(() => useProducts({}));

    expect(result.current.products).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.pagesCount).toBe(1);
  });

  it('should handle empty products array', () => {
    const data = {
      products: [],
      count: 0,
    };

    const { result } = renderHook(() => useProducts({ data }));

    expect(result.current.products).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.pagesCount).toBe(1);
  });
});

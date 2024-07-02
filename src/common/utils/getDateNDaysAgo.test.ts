import { describe, it, expect } from 'vitest';

import getDateNDaysAgo from './getDateNDaysAgo';

describe('getDateNDaysAgo', () => {
  it('should return the correct date for n days ago', () => {
    const today = new Date('2024-07-02T00:00:00.000Z');
    const daysAgo = 3;
    const expectedDate = new Date('2024-06-29T00:00:00.000Z');

    expect(getDateNDaysAgo(daysAgo, today).toISOString()).toBe(
      expectedDate.toISOString()
    );
  });

  it('should handle leap years correctly', () => {
    const today = new Date('2024-03-01T00:00:00.000Z');
    const daysAgo = 1;
    const expectedDate = new Date('2024-02-29T00:00:00.000Z'); // 2024 is a leap year

    expect(getDateNDaysAgo(daysAgo, today).toISOString()).toBe(
      expectedDate.toISOString()
    );
  });

  it('should return today for 0 days ago', () => {
    const today = new Date('2024-07-02T00:00:00.000Z');
    const daysAgo = 0;

    expect(getDateNDaysAgo(daysAgo, today).toISOString()).toBe(
      today.toISOString()
    );
  });

  it('should handle negative days correctly', () => {
    const today = new Date('2024-07-02T00:00:00.000Z');
    const daysAgo = -3;
    const expectedDate = new Date('2024-07-05T00:00:00.000Z');

    expect(getDateNDaysAgo(daysAgo, today).toISOString()).toBe(
      expectedDate.toISOString()
    );
  });
});

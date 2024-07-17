/* eslint-disable no-magic-numbers */
import { describe, it, expect } from 'vitest';

import formatToTwoDecimalPlaces from '../formatToTwoDecimalPlaces';

describe('formatToTwoDecimalPlaces', () => {
  it('should format integer to two decimal places', () => {
    expect(formatToTwoDecimalPlaces(1)).toBe('1.00');
  });

  it('should format number with one decimal place to two decimal places', () => {
    expect(formatToTwoDecimalPlaces(1.2)).toBe('1.20');
  });

  it('should format number with two decimal places correctly', () => {
    expect(formatToTwoDecimalPlaces(1.23)).toBe('1.23');
  });

  it('should format larger integer to two decimal places', () => {
    expect(formatToTwoDecimalPlaces(100)).toBe('100.00');
  });

  it('should format larger floating-point number to two decimal places', () => {
    expect(formatToTwoDecimalPlaces(123.456)).toBe('123.46');
  });

  it('should format negative numbers to two decimal places', () => {
    expect(formatToTwoDecimalPlaces(-1)).toBe('-1.00');
    expect(formatToTwoDecimalPlaces(-1.2)).toBe('-1.20');
    expect(formatToTwoDecimalPlaces(-123.456)).toBe('-123.46');
  });
});

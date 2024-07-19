/* eslint-disable no-magic-numbers */
import { describe, it, expect } from 'vitest';

import formatToTwoDecimalPlaces from '../formatToTwoDecimalPlaces';

describe('formatToTwoDecimalPlaces', () => {
  it('should format 1 to 1.00', () => {
    expect(formatToTwoDecimalPlaces(1)).toBe('1.00');
  });

  it('should format 1.2 to 1.20', () => {
    expect(formatToTwoDecimalPlaces(1.2)).toBe('1.20');
  });

  it('should format 100 to 100.00', () => {
    expect(formatToTwoDecimalPlaces(100)).toBe('100.00');
  });

  it('should format 1.236 to 1.24', () => {
    expect(formatToTwoDecimalPlaces(1.236)).toBe('1.24');
  });

  it('should format numeric string "1.236" to 1.24', () => {
    expect(formatToTwoDecimalPlaces(Number('1.236'))).toBe('1.24');
  });

  it('should format NaN to "NaN"', () => {
    expect(formatToTwoDecimalPlaces(NaN)).toBe('NaN');
  });
});

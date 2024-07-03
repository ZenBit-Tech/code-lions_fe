/* eslint-disable no-magic-numbers */
import { describe, it, expect } from 'vitest';

import isALeapYear from '../isALeapYear.ts';

describe('isALeapYear', () => {
  it('should return true for leap years', () => {
    expect(isALeapYear(2000)).toBe(true);
    expect(isALeapYear(2004)).toBe(true);
    expect(isALeapYear(2020)).toBe(true);
  });

  it('should return false for non-leap years', () => {
    expect(isALeapYear(1900)).toBe(false);
    expect(isALeapYear(2001)).toBe(false);
    expect(isALeapYear(2019)).toBe(false);
  });
});

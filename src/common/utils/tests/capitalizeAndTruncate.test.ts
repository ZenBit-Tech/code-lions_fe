/* eslint-disable */
import capitalizeAndTruncate from '../capitalizeAndTruncate';

describe('capitalizeAndTruncate', () => {
  it('should capitalize the first letter of the input', () => {
    expect(capitalizeAndTruncate('hello')).toBe('Hello');
  });

  it('should handle empty string input', () => {
    expect(capitalizeAndTruncate('')).toBe('');
  });

  it('should truncate the string if length is provided and shorter than input', () => {
    expect(capitalizeAndTruncate('hello world', 5)).toBe('Hello...');
  });

  it('should handle input with numbers', () => {
    expect(capitalizeAndTruncate('hello123')).toBe('Hello123');
    expect(capitalizeAndTruncate('hello123', 5)).toBe('Hello...');
  });

  it('should handle input with spaces', () => {
    expect(capitalizeAndTruncate('hello world')).toBe('Hello world');
    expect(capitalizeAndTruncate('hello world', 6)).toBe('Hello ...');
  });
});

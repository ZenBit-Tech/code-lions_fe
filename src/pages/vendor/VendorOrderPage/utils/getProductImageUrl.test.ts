import getProductImageUrl from './getProductImageUrl';
import mockProducts from './mocks';

describe('getProductImageUrl', () => {
  it('should return the URL of the primary image if it exists', () => {
    const result = getProductImageUrl(mockProducts[0]);

    expect(result).toBe('http://example.com/img2.jpg');
  });

  it('should return an empty string if no images exist', () => {
    const result = getProductImageUrl(mockProducts[1]);

    expect(result).toBe('');
  });

  it('should return an empty string if no primary image exists', () => {
    const result = getProductImageUrl(mockProducts[2]);

    expect(result).toBe('');
  });
});

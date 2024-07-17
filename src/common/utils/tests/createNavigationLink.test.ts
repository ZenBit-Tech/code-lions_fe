import createNavigationLink from '../createNavigationLink';

describe('createNavigationLink', () => {
  it('should create a navigation link with page and search query parameters', () => {
    const base = 'https://example.com';
    const queryParams = {
      page: '2',
      search: 'query',
    };

    const expected = 'https://example.com?page=2&search=query';
    const result = createNavigationLink(base, queryParams);

    expect(result).toBe(expected);
  });

  it('should handle empty query parameters', () => {
    const base = 'https://example.com';
    const queryParams = {};

    const expected = 'https://example.com?';
    const result = createNavigationLink(base, queryParams);

    expect(result).toBe(expected);
  });

  it('should handle base URL without trailing slash', () => {
    const base = 'https://example.com';
    const queryParams = {
      page: '2',
      search: 'query',
    };

    const expected = 'https://example.com?page=2&search=query';
    const result = createNavigationLink(base, queryParams);

    expect(result).toBe(expected);
  });

  it('should handle base URL with trailing slash', () => {
    const base = 'https://example.com/';
    const queryParams = {
      page: '2',
      search: 'query',
    };

    const expected = 'https://example.com/?page=2&search=query';
    const result = createNavigationLink(base, queryParams);

    expect(result).toBe(expected);
  });

  it('should encode special characters in query parameters', () => {
    const base = 'https://example.com';
    const queryParams = {
      page: '2',
      search: 'query with spaces and special characters &?',
    };

    const expected =
      'https://example.com?page=2&search=query+with+spaces+and+special+characters+%26%3F';
    const result = createNavigationLink(base, queryParams);

    expect(result).toBe(expected);
  });
});

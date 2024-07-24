import capitalizeAndTruncate from 'src/common/utils/capitalizeAndTruncate';

import processStringArray from './processStringArray';

describe('processStringArray', () => {
  it('should process an array of strings with the given processor function', () => {
    const input = ['red', 'blue', 'green'];
    const expectedOutput = 'Red, Blue, Green';

    const result = processStringArray(input, capitalizeAndTruncate);

    expect(result).toBe(expectedOutput);
  });

  it('should return an empty string for an empty array', () => {
    const input: string[] = [];
    const expectedOutput = '';

    const result = processStringArray(input, capitalizeAndTruncate);

    expect(result).toBe(expectedOutput);
  });

  it('should handle an array with one element', () => {
    const input = ['red'];
    const expectedOutput = 'Red';

    const result = processStringArray(input, capitalizeAndTruncate);

    expect(result).toBe(expectedOutput);
  });
});

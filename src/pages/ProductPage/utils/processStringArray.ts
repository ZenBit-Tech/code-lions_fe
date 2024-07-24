const processStringArray = (
  arr: string[],
  processor: (str: string, length?: number) => string,
  length?: number
): string => {
  return arr.map((item) => processor(item, length)).join(', ');
};

export default processStringArray;

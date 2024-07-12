function capitalizeAndTruncate(input: string, length?: number): string {
  if (!input) {
    return '';
  }

  let result = input.charAt(0).toUpperCase() + input.slice(1);

  if (length && length < result.length) {
    result = `${result.substring(0, length)}...`;
  }

  return result;
}

export default capitalizeAndTruncate;

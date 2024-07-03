export const addSpacesToCardNumber = (value: string): string => {
  return value
    .replace(/\s?/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
};

export const removeSpacesFromCardNumber = (value: string): string => {
  return value.replace(/\s/g, '');
};

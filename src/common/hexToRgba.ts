const hexToDecimal: number = 16;

const hexToRgba = (hex: string, opacity: number) => {
  /* eslint-disable no-magic-numbers */
  const r = parseInt(hex.slice(1, 3), hexToDecimal);
  const g = parseInt(hex.slice(3, 5), hexToDecimal);
  const b = parseInt(hex.slice(5, 7), hexToDecimal);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default hexToRgba;

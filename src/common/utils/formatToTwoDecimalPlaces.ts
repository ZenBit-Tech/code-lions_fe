const DECIMAL = 2;

function formatToTwoDecimalPlaces(num: number): string {
  return num.toFixed(DECIMAL);
}

export default formatToTwoDecimalPlaces;

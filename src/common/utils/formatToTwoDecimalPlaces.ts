const DECIMAL = 2;

function formatToTwoDecimalPlaces(num: number): string {
  return Number(num).toFixed(DECIMAL);
}

export default formatToTwoDecimalPlaces;

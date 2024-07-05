const TWENTYNINE = 29;

export default function isLeapYear(year: number) {
  return new Date(year, 1, TWENTYNINE).getMonth() === 1;
}

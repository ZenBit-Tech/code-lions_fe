function millisecondsToDays(milliseconds: number): number {
  const millisecondsInADay = 86400000;

  return Math.floor(Math.abs(milliseconds) / millisecondsInADay);
}

export default millisecondsToDays;

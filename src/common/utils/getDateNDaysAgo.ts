const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;

export default function getDateNDaysAgo(days: number, today: Date): Date {
  const millisecondsInADay = HOURS * MINUTES * SECONDS * MILLISECONDS;
  const timeInMilliseconds = today.getTime() - days * millisecondsInADay;

  return new Date(timeInMilliseconds);
}

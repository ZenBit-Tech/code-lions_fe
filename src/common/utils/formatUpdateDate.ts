const symbolsNumber: number = 2;
const ukarineUTC: number = 3;

function formatUpdateDate(
  dateString: string | null | undefined
): string | null {
  if (dateString) {
    const date = new Date(dateString);

    date.setUTCHours(date.getUTCHours() + ukarineUTC);

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const hours = date.getUTCHours().toString().padStart(symbolsNumber, '0');
    const minutes = date
      .getUTCMinutes()
      .toString()
      .padStart(symbolsNumber, '0');

    return `${formattedDate} - ${hours}.${minutes}`;
  } else {
    return null;
  }
}

export default formatUpdateDate;

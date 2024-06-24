const symbolsNumber: number = 2;

function formatUpdateDate(
  dateString: string | null | undefined
): string | null {
  if (dateString) {
    const date = new Date(dateString);

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

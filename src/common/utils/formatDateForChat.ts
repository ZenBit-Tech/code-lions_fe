import { format } from 'date-fns';
import { t } from 'i18next';

function formatDateForChatList(date: Date): string {
  const now = new Date();
  const hours = 24;
  const seconds = 3600;
  const milliseconds = 1000;
  const daysInAYear = 365;
  const oneDayDifference = 1;
  const twoDayDifference = 2;
  const millisecondsInADay = hours * seconds * milliseconds;
  const diff = (now.getTime() - date.getTime()) / millisecondsInADay;

  const timeFormat = 'p';
  const monthAndDayFormat = 'MMMM d';
  const yearMonthAndDayFormat = 'yyyy MM d';

  if (diff < oneDayDifference) {
    return format(date, timeFormat);
  } else if (diff < twoDayDifference) {
    return t('chat.yesterday');
  } else if (diff < daysInAYear) {
    return format(date, monthAndDayFormat);
  } else {
    return format(date, yearMonthAndDayFormat);
  }
}

export default formatDateForChatList;

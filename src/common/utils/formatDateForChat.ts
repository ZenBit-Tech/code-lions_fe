import { format } from 'date-fns';
import { t } from 'i18next';
import {
  monthAndDayFormat,
  timeFormat,
  yearMonthAndDayFormat,
} from 'src/common/constants';

function formatDateForChatList(date: string): string {
  const now = new Date();
  const dateObject = new Date(date);
  const hours = 24;
  const seconds = 3600;
  const milliseconds = 1000;
  const daysInAYear = 365;
  const oneDayDifference = 1;
  const twoDayDifference = 2;
  const millisecondsInADay = hours * seconds * milliseconds;
  const diff = (now.getTime() - dateObject.getTime()) / millisecondsInADay;

  if (diff < oneDayDifference) {
    return format(dateObject, timeFormat);
  } else if (diff < twoDayDifference) {
    return t('chat.yesterday');
  } else if (diff < daysInAYear) {
    return format(dateObject, monthAndDayFormat);
  } else {
    return format(dateObject, yearMonthAndDayFormat);
  }
}

export default formatDateForChatList;

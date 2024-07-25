import { describe, it, expect, vi } from 'vitest';

import { format } from 'date-fns';
import { t } from 'i18next';
import {
  monthAndDayFormat,
  timeFormat,
  yearMonthAndDayFormat,
} from 'src/common/constants';

import formatDateForChatList from '../formatDateForChat';

vi.mock('i18next', () => ({
  t: vi.fn((key: string) => {
    const translations = {
      'chat.yesterday': 'Yesterday',
    };

    return translations[key] || key;
  }),
}));

describe('formatDateForChatList', () => {
  it('should format date as time when the date is today', () => {
    const now = new Date();
    const result = formatDateForChatList(now.toString());

    expect(result).toBe(format(now, timeFormat));
  });

  it('should return "Yesterday" when the date is yesterday', () => {
    const yesterday = new Date();
    const oneDayAgo = 1;

    yesterday.setDate(yesterday.getDate() - oneDayAgo);
    const result = formatDateForChatList(yesterday.toString());

    expect(result).toBe(t('chat.yesterday'));
  });

  it('should format date as month and day when the date is within this year', () => {
    const dateWithinYear = new Date();
    const oneMonthAgo = 1;

    dateWithinYear.setMonth(dateWithinYear.getMonth() - oneMonthAgo);
    const result = formatDateForChatList(dateWithinYear.toString());

    expect(result).toBe(format(dateWithinYear, monthAndDayFormat));
  });

  it('should format date as year, month, and day when the date is over a year ago', () => {
    const overAYearAgo = new Date();
    const twoYearAgo = 2;

    overAYearAgo.setFullYear(overAYearAgo.getFullYear() - twoYearAgo);
    const result = formatDateForChatList(overAYearAgo);

    expect(result).toBe(format(overAYearAgo, yearMonthAndDayFormat));
  });
});

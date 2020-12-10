import { formatDate, getArrivalTime, formatDuration } from "./utils";

//1.01.2020, 02:03:04
const date = new Date(2020, 0, 1, 2, 3, 4);

describe('formatDate', () => {
    test('Date is formatted to hh:mm', () => {
      expect(formatDate(date)).toBe('02:03');
    });
});

describe('getArrivalTime', () => {
    test('A minutes is added to the original date', () => {
      expect(getArrivalTime(date, 65).toUTCString()).toBe('Tue, 31 Dec 2019 17:08:04 GMT');
    });
});

describe('formatDuration', () => {
    test('Duration in minutes is formatted to (HH)ч:(mm)м', () => {
      expect(formatDuration(65)).toBe('1ч 5м');
    });
});
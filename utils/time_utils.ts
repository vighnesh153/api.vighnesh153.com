export const timeUtils = {
  yearsToSeconds(years: number, leapYearCount: number = 0) {
    return this.daysToSeconds(years * 365 + leapYearCount);
  },
  weeksToSeconds(weeks: number) {
    return this.daysToSeconds(weeks * 7);
  },
  daysToSeconds(days: number) {
    return this.hoursToSeconds(days * 24);
  },
  hoursToSeconds(hours: number) {
    return this.minutesToSeconds(hours * 60);
  },
  minutesToSeconds(minutes: number) {
    return minutes * 60;
  },
};

export interface IDateProvider {
  dateNowPlusDays(days: number): Date;
  hasExpired(date: Date): boolean;
  parseISO(date: string): Date;
  firstDayOfMonth(date: Date): Date;
  lastDayOfMonth(date: Date): Date;
}

export const DateProviderToken = Symbol('DateProvider');
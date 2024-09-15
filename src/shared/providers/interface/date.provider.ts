export interface IDateProvider {
  dateNowPlusDays(days: number): Date;
  hasExpired(date: Date): boolean;
}

export const DateProviderToken = Symbol('DateProvider');
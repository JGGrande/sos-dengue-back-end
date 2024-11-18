export interface IDateProvider {
  dateNowPlusDays(days: number): Date;
  hasExpired(date: Date): boolean;
  parseISO(date: string): Date;
}

export const DateProviderToken = Symbol('DateProvider');
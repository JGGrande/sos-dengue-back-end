import { addDays, fromUnixTime, isPast, parseISO } from "date-fns";
import { IDateProvider } from "../interface/date.provider";

export class DateFnsProvider implements IDateProvider {
  public dateNowPlusDays(days: number): Date {
    return addDays(new Date(), days);
  }

  public hasExpired(date: Date): boolean {
    return isPast(date);
  }

  public parseISO(date: string): Date {
    return parseISO(date);
  }
}
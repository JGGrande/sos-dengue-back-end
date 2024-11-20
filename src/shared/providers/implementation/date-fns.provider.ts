import { addDays, fromUnixTime, isPast, lastDayOfMonth, parseISO } from "date-fns";
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

  public firstDayOfMonth(date: Date): Date {
    date.setUTCDate(1);

    date.setUTCHours(3, 0, 0, 0);

    return date;
  }

  public lastDayOfMonth(date: Date): Date {
    const lastDay = lastDayOfMonth(date);

    lastDay.setHours(23, 59, 59, 999);

    return lastDay;
  }
}
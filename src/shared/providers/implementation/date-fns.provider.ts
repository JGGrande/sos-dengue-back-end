import { addDays, fromUnixTime, isPast } from "date-fns";
import { IDateProvider } from "../interface/date.provider";

export class DateFnsProvider implements IDateProvider {
  public dateNowPlusDays(days: number): Date {
    return addDays(new Date(), days);
  }

  public hasExpired(date: Date): boolean {
    return isPast(date);
  }
}
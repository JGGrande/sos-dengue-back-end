import { Deposit } from "../types/deposit.type";
import { Sample } from "../types/sample.type";
import { Treatment } from "../types/treatment.type";

export class Visit {
  readonly id: number;
  activity: string;
  type: string;
  pending: string | null;
  startedAt: Date;
  endedAt: Date;
  inspected: boolean;
  deposit: Deposit;
  sample: Sample | null;
  treatment: Treatment | null;
  userId: number;
  residenceId: number;
}
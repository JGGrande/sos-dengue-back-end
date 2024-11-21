import { Deposit } from "../types/deposit.type";
import { Sample } from "../types/sample.type";
import { Treatment } from "../types/treatment.type";

type VisitProps = {
  id: number;
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
};

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

  constructor(props: VisitProps){
    this.id = props.id;
    this.activity = props.activity;
    this.type = props.type;
    this.pending = props.pending;
    this.startedAt = props.startedAt;
    this.endedAt = props.endedAt;
    this.inspected = props.inspected;
    this.deposit = props.deposit;
    this.sample = props.sample;
    this.treatment = props.treatment;
    this.userId = props.userId;
    this.residenceId = props.residenceId;
  }
}
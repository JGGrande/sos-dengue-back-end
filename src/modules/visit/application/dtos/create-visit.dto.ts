import { IsBoolean, IsEnum, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Deposit } from "../../domain/types/deposit.type";
import { Sample } from "../../domain/types/sample.type";
import { Treatment } from "../../domain/types/treatment.type";
import { VisitActivity, VisitPending, VisitType } from "../../domain/enums/visit.enum";

export class CreateVisitDto {
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

class DepositDto {
  @IsNumber({}, { message: 'A1 inválido.' })
  @IsOptional()
  a1: number | null;

  @IsNumber({}, { message: 'A2 inválido.' })
  @IsOptional()
  a2: number | null;

  @IsNumber({}, { message: 'B inválido.' })
  @IsOptional()
  b: number | null;

  @IsNumber({}, { message: 'C inválido.' })
  @IsOptional()
  c: number | null;

  @IsNumber({}, { message: 'D1 inválido.' })
  @IsOptional()
  d1: number | null;

  @IsNumber({}, { message: 'D2 inválido.' })
  @IsOptional()
  d2: number | null;

  @IsNumber({}, { message: 'E inválido.' })
  @IsOptional()
  e: number | null;

  @IsNumber({}, { message: 'Eliminado inválido.' })
  @IsOptional()
  eliminated: number | null;
}

class SampleDto {
  @IsNumber({}, { message: 'Inicial inválido.' })
  @IsOptional()
  initial: number | null;

  @IsNumber({}, { message: 'Final inválido.' })
  @IsOptional()
  final: number | null;

  @IsNumber({}, { message: 'Contagem de tubos inválida.' })
  @IsOptional()
  tubeCount: number | null;
}

class TreatmentDto {
  focal: {
    larvicide1: {
      type: string;
      quantity: number;
      depositedQuantity: number;
    };
    larvicide2: {
      type: string;
      quantity: number;
      depositedQuantity: number;
    };
  };
  perifocal: {
    type: string;
    quantity: number;
    depositedQuantity: number;
  }
}

export class CreateVisitaByRequestDto {
  @IsEnum(VisitActivity, { message: 'Atividade inválida.' })
  activity: string;

  @IsEnum(VisitType, { message: 'Tipo de visita inválida.' })
  type: string;

  @IsOptional()
  @IsEnum(VisitPending, { message: 'Status inválido.' })
  pending: string | null;

  @IsString({  message: 'Data de início inválida.' })
  @IsISO8601({ strict: true }, { message: 'Data de início inválida.' })
  startedAt: string;

  @IsString({  message: 'Data de fim inválida.' })
  @IsISO8601({ strict: true }, { message: 'Data de fim inválida.' })
  endedAt: string;

  @IsBoolean({ message: 'Inspeção inválida.' })
  inspected: boolean;

  @IsObject({ message: 'Depósito inválido.' })
  deposit: DepositDto;

  @IsObject({ message: 'Amostra inválida.' })
  @IsOptional()
  sample: SampleDto | null;

  @IsObject({ message: 'Tratamento inválido.' })
  @IsOptional()
  treatment: TreatmentDto | null;

  @IsNumber({}, { message: 'Usuário inválido.' })
  userId: number;

  @IsNumber({}, { message: 'Residência inválida.' })
  residenceId: number;
}
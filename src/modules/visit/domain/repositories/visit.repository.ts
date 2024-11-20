import { CreateVisitDto } from "../../application/dtos/create-visit.dto";
import { VisitWithUserAndResidenceDto } from "../../application/dtos/visit-with-user-and-residence.dto";

export interface IVisitRepository {
  create({}: CreateVisitDto): Promise<void>;
  countByUserIdAndStartedAtBetweenDate(userId: number, startDate: Date, endDate: Date): Promise<number>;
  countFociFoundByUserIdAndStartedAtBetweenDate(userId: number, startDate: Date, endDate: Date): Promise<number>;
  findAllByResidenceId(residenceId: number): Promise<VisitWithUserAndResidenceDto[]>;
}

export const VisitRepositoryToken = Symbol('VisitRepository');
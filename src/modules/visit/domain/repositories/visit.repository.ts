import { CreateVisitDto } from "../../application/dtos/create-visit.dto";

export interface IVisitRepository {
  create({}: CreateVisitDto): Promise<void>;
  countByUserIdAndStartedAtBetweenDate(userId: number, startDate: Date, endDate: Date): Promise<number>;
  countFociFoundByUserIdAndStartedAtBetweenDate(userId: number, startDate: Date, endDate: Date): Promise<number>;
}

export const VisitRepositoryToken = Symbol('VisitRepository');
import { CreateVisitDto } from "../../application/dtos/create-visit.dto";

export interface IVisitRepository {
  create({}: CreateVisitDto): Promise<void>;
}

export const VisitRepositoryToken = Symbol('VisitRepository');
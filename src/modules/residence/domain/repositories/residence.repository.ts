import { CreateResidenceDto } from "../../application/dtos/create-house-residence.dto";
import { FindAllResidenceByCoordinatesDto } from "../../application/dtos/find-residence.dto";
import { ResidenceWithVisitDto } from "../../application/dtos/residence-with-visit.dto";
import { Residence } from "../entites/residence.entity";

export interface IResidenceRepository {
  create({}: CreateResidenceDto): Promise<Residence>;
  update({}: Residence): Promise<Residence>;

  findAllByCoordinates({}: FindAllResidenceByCoordinatesDto): Promise<Residence[]>;
  findOne({}: Partial<Residence>): Promise<Residence | null>;
  exitsById(id: number): Promise<boolean>;
  findById(id: number): Promise<Residence | null>;
  findAllWithLatestVisit(): Promise<ResidenceWithVisitDto[]>;
}

export const ResidenceRepositoryToken = Symbol('ResidenceRepository');
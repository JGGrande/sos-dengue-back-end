import { Residence } from "../entites/residence.entity";
import { CreateResidenceDto } from "../../application/dtos/create-house-residence.dto";
import { FindAllResidenceByCoordinatesDto, FindHouseResidenceDto, FindHouseResidenceWithBlockDto } from "../../application/dtos/find-residence.dto";
import { ResidenceWithVisitDto } from "../../application/dtos/residence-with-visit.dto";

export interface IResidenceRepository {
  create({}: CreateResidenceDto): Promise<Residence>;
  update({}: Residence): Promise<Residence>;

  findAllByCoordinates({}: FindAllResidenceByCoordinatesDto): Promise<Residence[]>;
  findByCepAndStreetAndNumber({}: FindHouseResidenceDto): Promise<Residence | null>;
  findByCepAndStreetAndNumberAndBlock({}: FindHouseResidenceWithBlockDto): Promise<Residence | null>;
  exitsById(id: number): Promise<boolean>;
  findById(id: number): Promise<Residence | null>;
  findAllWithLatestVisit(): Promise<ResidenceWithVisitDto[]>;
}

export const ResidenceRepositoryToken = Symbol('ResidenceRepository');
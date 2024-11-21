import { Residence } from "../entites/residence.entity";
import { CreateResidenceDto } from "../../application/dtos/create-residence.dto";
import { FindAllResidenceByCoordinatesDto, FindHouseResidenceDto, FindHouseResidenceWithBlockDto } from "../../application/dtos/find-residence.dto";

export interface IResidenceRepository {
  create({}: CreateResidenceDto): Promise<Residence>;
  findAllByCoordinates({}: FindAllResidenceByCoordinatesDto): Promise<Residence[]>;
  findByCepAndStreetAndNumber({}: FindHouseResidenceDto): Promise<Residence | null>;
  findByCepAndStreetAndNumberAndBlock({}: FindHouseResidenceWithBlockDto): Promise<Residence | null>;
  exitsById(id: number): Promise<boolean>;
}

export const ResidenceRepositoryToken = Symbol('ResidenceRepository');
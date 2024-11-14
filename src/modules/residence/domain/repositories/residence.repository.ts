import { Residence } from "../entites/residence.entity";
import { CreateResidenceDto } from "../../application/dtos/create-residence.dto";
import { FindAllResidenceByCoordinatesDto, FindResidenceDto, FindResidenceWithBlockDto } from "../../application/dtos/find-residence.dto";

export interface IResidenceRepository {
  create({}: CreateResidenceDto): Promise<Residence>;
  findAllByCoordinates({}: FindAllResidenceByCoordinatesDto): Promise<Residence[]>;
  findByCepAndStreetAndNumber({}: FindResidenceDto): Promise<Residence | null>;
  findByCepAndStreetAndNumberAndBlock({}: FindResidenceWithBlockDto): Promise<Residence | null>;
}

export const ResidenceRepositoryToken = Symbol('ResidenceRepository');
import { Residence } from "../entites/residence.entity";
import { CreateResidenceDto } from "../../application/dtos/create-residence.dto";
import { FindAllResidenceByCoordinatesDto } from "../../application/dtos/find-all-residence-by-coordinates.dto";

export interface IResidenceRepository {
  create({}: CreateResidenceDto): Promise<Residence>;
  findAllByCoordinates({}: FindAllResidenceByCoordinatesDto): Promise<Residence[]>;
}

export const ResidenceRepositoryToken = Symbol('ResidenceRepository');
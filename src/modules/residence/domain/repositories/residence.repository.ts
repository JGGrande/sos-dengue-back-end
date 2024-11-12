import { Residence } from "../entites/residence.entity";
import { CreateResidenceDto } from "../../application/dtos/create-residence.dto";

export interface IResidenceRepository {
  create({}: CreateResidenceDto): Promise<Residence>;
}

export const ResidenceRepositoryToken = Symbol('ResidenceRepository');
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { Residence } from "../../domain/entites/residence.entity";

type CreateResidenceServiceProps = {
  type: string;
  cep: string;
  lat: number;
  lng: number;
  street: string;
  number: string | null;
  neighborhood: string;
  streetCourt: string | null;
  block: string | null;
  complement: string | null;
  apartmentNumber: string | null;
}

@Injectable()
export class CreateResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(data: CreateResidenceServiceProps): Promise<Residence> {
    if(data.block){
      const residence = await this.residenceRepository.findByCepAndStreetAndNumberAndBlock({
        cep: data.cep,
        street: data.street,
        number: data.number,
        block: data.block
      });

      if(residence){
        throw new ConflictException('Residência já cadastrada.');
      }
    }

    const residenceAlreadyExists = await this.residenceRepository.findByCepAndStreetAndNumber({
      cep: data.cep,
      street: data.street,
      number: data.number
    });

    if(residenceAlreadyExists){
      throw new ConflictException('Residência já cadastrada.');
    }

    const newResidence = await this.residenceRepository.create(data);

    return newResidence;
  }
}
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { Residence } from "../../domain/entites/residence.entity";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type CreateHouseResidenceServiceProps = {
  cep: string;
  lat: number;
  lng: number;
  street: string;
  number: string;
  neighborhood: string;
  streetCourt: string;
  block: string | null;
  complement: string | null;
}

@Injectable()
export class CreateHouseResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(data: CreateHouseResidenceServiceProps): Promise<Residence> {
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

    const newResidence = await this.residenceRepository.create({
      ...data,
      type: ResidenceTypeEnum.HOUSE,
      apartmentNumber: null,
    });

    return newResidence;
  }
}
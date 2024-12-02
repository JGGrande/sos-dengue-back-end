import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { Residence } from "../../domain/entites/residence.entity";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type CreateCommercialResidenceServiceProps = {
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
export class CreateCommercialResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(data: CreateCommercialResidenceServiceProps): Promise<Residence> {
    const residenceAlreadyExists = await this.residenceRepository.findOne({
      type: ResidenceTypeEnum.COMMERCIAL,
      cep: data.cep,
      street: data.street,
      number: data.number,
      block: data.block
    });

    if(residenceAlreadyExists){
      throw new ConflictException('Residência já cadastrada.');
    }

    const newResidence = await this.residenceRepository.create({
      ...data,
      type: ResidenceTypeEnum.COMMERCIAL,
      apartmentNumber: null,
    });

    return newResidence;
  }
}
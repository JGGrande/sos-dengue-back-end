import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { Residence } from "../../domain/entites/residence.entity";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type CreateOthersResidenceServiceProps = {
  cep: string;
  lat: number;
  lng: number;
  street: string;
  number: string;
  neighborhood: string;
  streetCourt: string;
  complement: string;
  block: string | null;
}

@Injectable()
export class CreateOthersResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(data: CreateOthersResidenceServiceProps): Promise<Residence> {
    const residenceAlreadyExists = await this.residenceRepository.findOne({
      cep: data.cep,
      street: data.street,
      number: data.number,
      block: data.block,
      complement: data.complement,
      type: ResidenceTypeEnum.OTHERS,
    });

    if(residenceAlreadyExists){
      throw new ConflictException('Residência já cadastrada.');
    }

    const newResidence = await this.residenceRepository.create({
      ...data,
      type: ResidenceTypeEnum.OTHERS,
      apartmentNumber: null
    });

    return newResidence;
  }
}
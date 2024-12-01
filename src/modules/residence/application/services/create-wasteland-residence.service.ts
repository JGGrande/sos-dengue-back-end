import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { Residence } from "../../domain/entites/residence.entity";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type CreateWastelandResidenceServiceProps = {
  cep: string;
  lat: number;
  lng: number;
  street: string;
  referencePoint: string;
  neighborhood: string;
  streetCourt: string;
  block: string | null;
}

@Injectable()
export class CreateWastelandResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(data: CreateWastelandResidenceServiceProps): Promise<Residence> {
    const residenceAlreadyExists = await this.residenceRepository.findOne({
      cep: data.cep,
      street: data.street,
      block: data.block,
      complement: data.referencePoint,
      type: ResidenceTypeEnum.WASTELAND,
    });

    if(residenceAlreadyExists){
      throw new ConflictException('Residência já cadastrada.');
    }

    const complement = data.referencePoint;

    delete data.referencePoint;

    const newResidence = await this.residenceRepository.create({
      ...data,
      complement,
      type: ResidenceTypeEnum.WASTELAND,
      apartmentNumber: null,
      number: null
    });

    return newResidence;
  }
}
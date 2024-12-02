import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";

type UpdateResidenceServiceProps = {
  id: number;
  type: ResidenceTypeEnum;
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
export class UpdateResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(residenceData: UpdateResidenceServiceProps){
    const residence = await this.residenceRepository.findById(residenceData.id);

    if(!residence){
      throw new NotFoundException('Residência não encontrada.');
    }

    if(residenceData.type === ResidenceTypeEnum.HOUSE){
      residence.cep = residenceData.cep;
      residence.lat = residenceData.lat;
      residence.lng = residenceData.lng;
      residence.street = residenceData.street;
      residence.number = residenceData.number;
      residence.neighborhood = residenceData.neighborhood;
      residence.streetCourt = residenceData.streetCourt;
      residence.complement = residenceData.complement;
    }

    if(residenceData.type === ResidenceTypeEnum.APARTMENT){
      residence.cep = residenceData.cep;
      residence.lat = residenceData.lat;
      residence.lng = residenceData.lng;
      residence.street = residenceData.street;
      residence.neighborhood = residenceData.neighborhood;
      residence.number = residenceData.number;
      residence.apartmentNumber = residenceData.apartmentNumber;
      residence.streetCourt = residenceData.streetCourt;
      residence.block = residenceData.block;
      residence.complement = residenceData.complement;
    }

    if(residenceData.type === ResidenceTypeEnum.COMMERCIAL){
      residence.cep = residenceData.cep;
      residence.lat = residenceData.lat;
      residence.lng = residenceData.lng;
      residence.street = residenceData.street;
      residence.neighborhood = residenceData.neighborhood;
      residence.number = residenceData.number;
      residence.streetCourt = residenceData.streetCourt;
      residence.block = residenceData.block;
      residence.complement = residenceData.complement;
    }

    if(residenceData.type === ResidenceTypeEnum.WASTELAND){
      residence.cep = residenceData.cep;
      residence.lat = residenceData.lat;
      residence.lng = residenceData.lng;
      residence.street = residenceData.street;
      residence.neighborhood = residenceData.neighborhood;
      residence.complement = residenceData.complement;
      residence.streetCourt = residenceData.streetCourt;
      residence.block = residenceData.block;
    }

    if(residenceData.type === ResidenceTypeEnum.OTHERS){
      residence.cep = residenceData.cep;
      residence.lat = residenceData.lat;
      residence.lng = residenceData.lng;
      residence.street = residenceData.street;
      residence.neighborhood = residenceData.neighborhood;
      residence.number = residenceData.number;
      residence.streetCourt = residenceData.streetCourt;
      residence.complement = residenceData.complement;
      residence.block = residenceData.block;
    }

    const residenceUpdated = await this.residenceRepository.update(residence);

    return residenceUpdated;
  }
}
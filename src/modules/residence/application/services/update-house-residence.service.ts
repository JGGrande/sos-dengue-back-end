import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";

type UpdateHouseResidenceServiceProps = {
  id: number;
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
export class UpdateHouseResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(residenceData: UpdateHouseResidenceServiceProps){
    const residence = await this.residenceRepository.findById(residenceData.id);

    if(!residence){
      throw new NotFoundException('Residência não encontrada.');
    }

    residence.cep = residenceData.cep;
    residence.lat = residenceData.lat;
    residence.lng = residenceData.lng;
    residence.street = residenceData.street;
    residence.number = residenceData.number;
    residence.neighborhood = residenceData.neighborhood;
    residence.streetCourt = residenceData.streetCourt;
    residence.block = residenceData.block;
    residence.complement = residenceData.complement;

    const residenceUpdated = await this.residenceRepository.update(residence);

    return residenceUpdated;
  }
}
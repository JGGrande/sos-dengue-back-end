import { Inject, Injectable } from "@nestjs/common";
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
    const newResidence = await this.residenceRepository.create(data);

    return newResidence;
  }
}
import { Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type FindApartmentResidenceServiceProps = {
  cep: string;
  number: string;
  street: string;
  block: string | null;
  apartmentNumber: string | null;
}

@Injectable()
export class FindApartmentResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute({ cep, number, street, block, apartmentNumber }: FindApartmentResidenceServiceProps) {
    const residence = await this.residenceRepository.findOne({
      cep,
      street,
      number,
      block,
      apartmentNumber,
      type: ResidenceTypeEnum.APARTMENT
    });

    return residence;
  }
}
import { Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type FindCommercialResidenceServiceProps = {
  cep: string;
  number: string;
  street: string;
  block: string | null;
}

@Injectable()
export class FindCommercialResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute({ cep, number, street, block }: FindCommercialResidenceServiceProps) {
    const residence = await this.residenceRepository.findOne({
      cep: cep,
      street: street,
      number: number,
      block,
      type: ResidenceTypeEnum.COMMERCIAL
    });

    return residence;
  }
}
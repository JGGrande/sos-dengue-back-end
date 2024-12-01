import { Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type FindOthersResidenceServiceProps = {
  cep: string;
  number: string;
  street: string;
  block: string | null;
  complement: string;
}

@Injectable()
export class FindOthersResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute({ cep, number, street, block , complement}: FindOthersResidenceServiceProps) {
    const residence = await this.residenceRepository.findOne({
      cep,
      street,
      number,
      block,
      complement,
      type: ResidenceTypeEnum.OTHERS
    });

    return residence;
  }
}
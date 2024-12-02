import { Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { ResidenceTypeEnum } from "../../domain/enums/residence.enum";

type FindWasteLandResidenceServiceProps = {
  cep: string;
  street: string;
  referencePoint: string;
  block: string | null;
}

@Injectable()
export class FindWasteLandResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute({ cep, street, block, referencePoint }: FindWasteLandResidenceServiceProps) {
    const residence = await this.residenceRepository.findOne({
      cep,
      street,
      block,
      complement: referencePoint,
      type: ResidenceTypeEnum.WASTELAND
    });

    return residence;
  }
}
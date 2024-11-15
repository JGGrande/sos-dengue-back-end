import { Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";

type FindHouseResidenceServiceProps = {
  cep: string;
  number: string;
  street: string;
  block: string | null;
}

@Injectable()
export class FindHouseResidenceService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute({ cep, number, street, block }: FindHouseResidenceServiceProps) {
    if(block){
      const residence = await this.residenceRepository.findByCepAndStreetAndNumberAndBlock({
        cep: cep,
        street: street,
        number: number,
        block: block
      });

      return residence;
    }

    const residence = await this.residenceRepository.findByCepAndStreetAndNumber({
      cep: cep,
      street: street,
      number: number
    });

    return residence;
  }
}
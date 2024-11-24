import { Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { Residence } from "../../domain/entites/residence.entity";

@Injectable()
export class FindResidenceByIdService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute(id: number): Promise<Residence | null> {
    const residence = await this.residenceRepository.findById(id);

    return residence;
  }
}
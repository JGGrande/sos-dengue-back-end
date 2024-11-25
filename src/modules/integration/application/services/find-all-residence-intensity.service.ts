import { Inject, Injectable } from "@nestjs/common";
import { ResidenceWithVisitDto } from "src/modules/residence/application/dtos/residence-with-visit.dto";
import { IResidenceRepository, ResidenceRepositoryToken } from "src/modules/residence/domain/repositories/residence.repository";

type ResidenceIntensity = {
  lat: number;
  lng: number;
  intensity: number;
}

@Injectable()
export class FindAllResidenceIntensityService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  private residencesIntensityMapper(residences: ResidenceWithVisitDto[]): ResidenceIntensity[] {
    return residences.map(residence => {
      const intensity = residence.visit.sample?.tubeCount ?? 0;

      return {
        lat: residence.lat,
        lng: residence.lng,
        intensity
      }
    });
  }

  async execute(){
    const residences = await this.residenceRepository.findAllWithLatestVisit();

    return this.residencesIntensityMapper(residences);
  }

}
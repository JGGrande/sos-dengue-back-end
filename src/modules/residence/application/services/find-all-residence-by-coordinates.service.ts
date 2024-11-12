import { Inject, Injectable } from "@nestjs/common";
import { IResidenceRepository, ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";

type FindAllResidenceByCoordinatesServiceProps = {
  lat: number;
  lng: number;
}

@Injectable()
export class FindAllResidenceByCoordinatesService {
  constructor(
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository
  ) { }

  async execute({ lat, lng }: FindAllResidenceByCoordinatesServiceProps) {
    const radiusMeters = 100;
    const metersDegree = radiusMeters / 111_320;

    const residences = await this.residenceRepository.findAllByCoordinates({
      lat,
      lng, distanceInDegrees: metersDegree
    });

    return residences;
  }
}
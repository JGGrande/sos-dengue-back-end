import { Module } from "@nestjs/common";
import { ResidenceController } from "./infra/http/controllers/residence.controller";
import { CreateHouseResidenceService } from "./application/services/create-house-residence.service";
import { DIContainer } from "./infra/di/residence.container";
import { FindAllResidenceByCoordinatesService } from "./application/services/find-all-residence-by-coordinates.service";
import { FindHouseResidenceService } from "./application/services/find-house-residence.service";
import { UpdateHouseResidenceService } from "./application/services/update-house-residence.service";
import { FindResidenceByIdService } from "./application/services/find-residence-by-id.service";

@Module({
  imports: [ DIContainer ],
  controllers: [ ResidenceController ],
  providers: [
    CreateHouseResidenceService,
    FindAllResidenceByCoordinatesService,
    FindHouseResidenceService,
    FindResidenceByIdService,
    UpdateHouseResidenceService
  ],
})
export class ResidenceModule { }
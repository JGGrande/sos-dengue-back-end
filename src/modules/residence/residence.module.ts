import { Module } from "@nestjs/common";
import { ResidenceController } from "./infra/http/controllers/residence.controller";
import { CreateResidenceService } from "./application/services/create-residence.service";
import { DIContainer } from "./infra/di/residence.container";
import { FindAllResidenceByCoordinatesService } from "./application/services/find-all-residence-by-coordinates.service";

@Module({
  imports: [ DIContainer ],
  controllers: [ ResidenceController ],
  providers: [
    CreateResidenceService,
    FindAllResidenceByCoordinatesService
  ],
})
export class ResidenceModule { }
import { Module } from "@nestjs/common";
import { ResidenceController } from "./infra/http/controllers/residence.controller";
import { CreateResidenceService } from "./application/services/create-residence.service";
import { DIContainer } from "./infra/di/residence.container";

@Module({
  imports: [ DIContainer ],
  controllers: [ ResidenceController ],
  providers: [
    CreateResidenceService
  ],
})
export class ResidenceModule { }
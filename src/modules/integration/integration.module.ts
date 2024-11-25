import { Module } from "@nestjs/common";
import { DIContainer } from "./infra/di/integration.container";
import { FindAllResidenceIntensityService } from "./application/services/find-all-residence-intensity.service";
import { IntegrationController } from "./infra/http/controllers/integration.controller";

@Module({
  imports: [ DIContainer ],
  controllers: [ IntegrationController ],
  providers: [
    FindAllResidenceIntensityService
  ],
})
export class IntegrationModule { }
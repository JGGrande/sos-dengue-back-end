import { Controller, Get } from "@nestjs/common";
import { FindAllResidenceIntensityService } from "src/modules/integration/application/services/find-all-residence-intensity.service";

@Controller("integrations")
export class IntegrationController {
  constructor(
    private readonly findAllResidenceIntensityService: FindAllResidenceIntensityService
  ){ }

  @Get("powerbi")
  public async findAllResidenceIntensity() {
    return this.findAllResidenceIntensityService.execute();
  }

}
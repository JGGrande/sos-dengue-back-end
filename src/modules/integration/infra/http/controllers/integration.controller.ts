import { Controller, Get, Render } from "@nestjs/common";
import { FindAllResidenceIntensityService } from "src/modules/integration/application/services/find-all-residence-intensity.service";

@Controller("integrations")
export class IntegrationController {
  constructor(
    private readonly findAllResidenceIntensityService: FindAllResidenceIntensityService
  ){ }

  @Get("heat-map")
  @Render("heat-map.template.hbs")
  public async findAllResidenceIntensity() {
    const data = await this.findAllResidenceIntensityService.execute();

    return {
      heatmapData: JSON.stringify(data)
    };
  }

}
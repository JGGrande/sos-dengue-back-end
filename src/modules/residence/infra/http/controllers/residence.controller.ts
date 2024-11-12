import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { RoleGuard } from "src/shared/guards/role.guard";
import { CreateResidenceService } from "src/modules/residence/application/services/create-residence.service";
import { CreateResidenceDto } from "src/modules/residence/application/dtos/create-residence.dto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("residences")
export class ResidenceController {
  constructor(
    private readonly createResidenceService: CreateResidenceService
  ){ }

  @Post()
  public async create(@Body() body: CreateResidenceDto) {
    const residence = await this.createResidenceService.execute(body);

    return residence;
  }

}
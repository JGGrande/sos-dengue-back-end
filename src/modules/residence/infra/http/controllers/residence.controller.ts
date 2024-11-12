import { z } from "zod";
import { FastifyRequest } from "fastify";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";

import { CreateResidenceDto } from "src/modules/residence/application/dtos/create-residence.dto";
import { CreateResidenceService } from "src/modules/residence/application/services/create-residence.service";
import { FindAllResidenceByCoordinatesService } from "src/modules/residence/application/services/find-all-residence-by-coordinates.service";
import { AuthGuard } from "src/shared/guards/auth.guard";


@UseGuards(AuthGuard)
@Controller("residences")
export class ResidenceController {
  constructor(
    private readonly createResidenceService: CreateResidenceService,
    private readonly findAllResidenceByCoordinatesService: FindAllResidenceByCoordinatesService
  ){ }

  @Post()
  public async create(@Body() body: CreateResidenceDto) {
    const residence = await this.createResidenceService.execute(body);

    return residence;
  }

  @Get("/lat/:lat/lng/:lng")
  public async findAllByCoordinates(
    @Req() req: FastifyRequest,
  ) {
    const findAllByCoordinatesParamsSchema = z.object({
      lat: z.coerce.number(),
      lng: z.coerce.number(),
    });

    const { lat, lng } = findAllByCoordinatesParamsSchema.parse(req.params);

    const residences =  await this.findAllResidenceByCoordinatesService.execute({ lat, lng });

    return residences;
  }

}
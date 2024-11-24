import { z } from "zod";
import { FastifyRequest } from "fastify";
import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";

import { CreateHouseResidenceRequestDto } from "src/modules/residence/application/dtos/create-house-residence.dto";
import { CreateHouseResidenceService } from "src/modules/residence/application/services/create-house-residence.service";
import { FindAllResidenceByCoordinatesService } from "src/modules/residence/application/services/find-all-residence-by-coordinates.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { FindHouseResidenceService } from "src/modules/residence/application/services/find-house-residence.service";
import { ParamId } from "src/shared/decorators/param-id.decorator";
import { UpdateHouseResidenceService } from "src/modules/residence/application/services/update-house-residence.service";
import { UpdateHouseResidenceRequestDto } from "src/modules/residence/application/dtos/update-house-residence.dto";
import { FindResidenceByIdService } from "src/modules/residence/application/services/find-residence-by-id.service";

@UseGuards(AuthGuard)
@Controller("residences")
export class ResidenceController {
  constructor(
    private readonly createHouseResidenceService: CreateHouseResidenceService,
    private readonly findAllResidenceByCoordinatesService: FindAllResidenceByCoordinatesService,
    private readonly findHouseResidenceService: FindHouseResidenceService,
    private readonly updateHouseResidenceService: UpdateHouseResidenceService,
    private readonly findResidenceByIdService: FindResidenceByIdService,
  ){ }

  @Post("/house")
  public async create(@Body() body: CreateHouseResidenceRequestDto) {
    const residence = await this.createHouseResidenceService.execute(body);

    return residence;
  }

  @Put("/house/:id")
  public async update(
    @Body() body: UpdateHouseResidenceRequestDto,
    @ParamId() id: number
  ) {
    return this.updateHouseResidenceService.execute({ id, ...body });
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

  @Get("/house")
  public async findHouse(
    @Req() req: FastifyRequest
  ) {
    const findHouseQuerySchema = z.object({
      cep: z.string(),
      number: z.string(),
      street: z.string(),
      block: z.string().optional(),
    });

    const { cep, number, street, block } = findHouseQuerySchema.parse(req.query);

    const residences = await this.findHouseResidenceService.execute({
      cep,
      number,
      street,
      block
    });

    return residences;
  }

  @Get(":id")
  public async findById(
    @ParamId() id: number
  ) {
    return this.findResidenceByIdService.execute(id);
  }

}
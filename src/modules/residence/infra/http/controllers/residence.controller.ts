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
import { UpdateApartmentResidenceRequestDto, UpdateHouseResidenceRequestDto, UpdateWastelandResidenceRequestDto } from "src/modules/residence/application/dtos/update-residence.dto";
import { FindResidenceByIdService } from "src/modules/residence/application/services/find-residence-by-id.service";
import { CreateApartmentResidenceService } from "src/modules/residence/application/services/create-apartment-residence.service";
import { CreateApartmentResidenceRequestDto } from "src/modules/residence/application/dtos/create-apartment-residence.dto";
import { FindApartmentResidenceService } from "src/modules/residence/application/services/find-apartment-residence.service";
import { CreateWastelandResidenceService } from "src/modules/residence/application/services/create-wasteland-residence.service";
import { CreateWastelandResidenceRequestDto } from '../../../application/dtos/create-wasteland-residence.dto';
import { FindWasteLandResidenceService } from "src/modules/residence/application/services/find-wasteland-residence.service";
import { CreateCommercialResidenceService } from "src/modules/residence/application/services/create-commercial-residence.service";
import { CreateCommercialResidenceRequestDto } from "src/modules/residence/application/dtos/create-commercial-residence.dto";
import { FindCommercialResidenceService } from "src/modules/residence/application/services/find-commercial-residence.service";
import { CreateOthersResidenceService } from '../../../application/services/create-others-residence.service';
import { CreateOthersResidenceRequestDto } from "src/modules/residence/application/dtos/create-others-residence.dto";
import { FindOthersResidenceService } from "src/modules/residence/application/services/find-others-residence.service";
import { UpdateResidenceService } from "src/modules/residence/application/services/update-residence.service";
import { ResidenceTypeEnum } from "src/modules/residence/domain/enums/residence.enum";

@UseGuards(AuthGuard)
@Controller("residences")
export class ResidenceController {
  constructor(
    private readonly createHouseResidenceService: CreateHouseResidenceService,
    private readonly createApartmentResidenceService: CreateApartmentResidenceService,
    private readonly createWastelandResidenceService: CreateWastelandResidenceService,
    private readonly createCommercialResidenceService: CreateCommercialResidenceService,
    private readonly createOthersResidenceService: CreateOthersResidenceService,
    private readonly findAllResidenceByCoordinatesService: FindAllResidenceByCoordinatesService,
    private readonly findHouseResidenceService: FindHouseResidenceService,
    private readonly findApartmentResidenceService: FindApartmentResidenceService,
    private readonly findWasteLandResidenceService: FindWasteLandResidenceService,
    private readonly findCommercialResidenceService: FindCommercialResidenceService,
    private readonly findOthersResidenceService: FindOthersResidenceService,
    private readonly findResidenceByIdService: FindResidenceByIdService,
    private readonly updateResidenceService: UpdateResidenceService,
  ){ }

  @Post("/house")
  public async createHouse(@Body() body: CreateHouseResidenceRequestDto) {
    const residence = await this.createHouseResidenceService.execute(body);

    return residence;
  }

  @Post("/apartment")
  public async createApartment(@Body() body: CreateApartmentResidenceRequestDto) {
    const residence = await this.createApartmentResidenceService.execute(body);

    return residence;
  }

  @Post("/wasteland")
  public async createWasteland(@Body() body: CreateWastelandResidenceRequestDto) {
    const residence = await this.createWastelandResidenceService.execute(body);

    return residence;
  }

  @Post("/commercial")
  public async createCommercial(
    @Body() body: CreateCommercialResidenceRequestDto
  ) {
    const residence = await this.createCommercialResidenceService.execute(body);

    return residence;
  }

  @Post("/others")
  public async createOthers(
    @Body() body: CreateOthersResidenceRequestDto
  ) {
    const residence = await this.createOthersResidenceService.execute(body);

    return residence;
  }

  @Put("/house/:id")
  public async update(
    @Body() body: UpdateHouseResidenceRequestDto,
    @ParamId() id: number
  ) {
    return this.updateResidenceService.execute({
      id,
      apartmentNumber: null,
      type: ResidenceTypeEnum.HOUSE,
      ...body
    });
  }

  @Put("/apartment/:id")
  public async updateApartment(
    @Body() body: UpdateApartmentResidenceRequestDto,
    @ParamId() id: number
  ) {
    return this.updateResidenceService.execute({
      id,
      type: ResidenceTypeEnum.APARTMENT,
      ...body
    });
  }

  @Put("/wasteland/:id")
  public async updateWasteland(
    @Body() body: UpdateWastelandResidenceRequestDto,
    @ParamId() id: number
  ) {
    return this.updateResidenceService.execute({
      id,
      apartmentNumber: null,
      number: null,
      complement: body.referencePoint,
      type: ResidenceTypeEnum.WASTELAND,
      ...body
    });
  }

  @Put("/commercial/:id")
  public async updateCommercial(
    @Body() body: UpdateHouseResidenceRequestDto,
    @ParamId() id: number
  ) {
    return this.updateResidenceService.execute({
      id,
      apartmentNumber: null,
      type: ResidenceTypeEnum.COMMERCIAL,
      ...body
    });
  }

  @Put("/others/:id")
  public async updateOthers(
    @Body() body: UpdateHouseResidenceRequestDto,
    @ParamId() id: number
  ) {
    return this.updateResidenceService.execute({
      id,
      apartmentNumber: null,
      type: ResidenceTypeEnum.OTHERS,
      ...body
    });
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

  @Get("/apartment")
  public async findApartment(
    @Req() req: FastifyRequest
  ) {
    const findApartmentQuerySchema = z.object({
      cep: z.string(),
      number: z.string(),
      street: z.string(),
      block: z.string().optional(),
      apartmentNumber: z.string()
    });

    const { cep, number, street, block, apartmentNumber } = findApartmentQuerySchema.parse(req.query);

    const residences = await this.findApartmentResidenceService.execute({
      cep,
      number,
      street,
      block,
      apartmentNumber
    });

    return residences;
  }

  @Get("/wasteland")
  public async findWasteland(
    @Req() req: FastifyRequest
  ) {
    const findWastelandQuerySchema = z.object({
      cep: z.string(),
      referencePoint: z.string(),
      street: z.string(),
      block: z.string().optional(),
    });

    const { cep, street, block, referencePoint } = findWastelandQuerySchema.parse(req.query);

    const residences = await this.findWasteLandResidenceService.execute({
      cep,
      street,
      block,
      referencePoint
    });

    return residences;
  }

  @Get("/commercial")
  public async findCommercial(
    @Req() req: FastifyRequest
  ) {
    const findCommercialQuerySchema = z.object({
      cep: z.string(),
      number: z.string(),
      street: z.string(),
      block: z.string().optional(),
    });

    const { cep, number, street, block } = findCommercialQuerySchema.parse(req.query);

    const residences = await this.findCommercialResidenceService.execute({
      cep,
      number,
      street,
      block
    });

    return residences;
  }

  @Get("/others")
  public async findOthers(
    @Req() req: FastifyRequest
  ) {
    const findOthersQuerySchema = z.object({
      cep: z.string(),
      number: z.string(),
      street: z.string(),
      block: z.string().optional(),
      complement: z.string()
    });

    const { cep, number, street, block, complement } = findOthersQuerySchema.parse(req.query);

    const residences = await this.findOthersResidenceService.execute({
      cep,
      number,
      street,
      block,
      complement
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
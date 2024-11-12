import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateResidenceDto } from "../../application/dtos/create-residence.dto";
import { Residence } from "../../domain/entites/residence.entity";
import { IResidenceRepository } from "../../domain/repositories/residence.repository";
import { FindAllResidenceByCoordinatesDto } from "../../application/dtos/find-all-residence-by-coordinates.dto";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class PrismaResidenceRepository implements IResidenceRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public async create(createResidenceDto: CreateResidenceDto): Promise<Residence> {
    const newResidenceData = await this.prisma.residence.create({
      data: createResidenceDto,
    });

    const newResidence = new Residence({
      ...newResidenceData,
      lat: newResidenceData.lat.toNumber(),
      lng: newResidenceData.lng.toNumber(),
    });

    return newResidence;
  }

  public async findAllByCoordinates({ lat, lng, distanceInDegrees }: FindAllResidenceByCoordinatesDto): Promise<Residence[]> {
    const residences = await this.prisma.residence.findMany({
      where: {
        lat: {
          gte: new Decimal(lat - distanceInDegrees),
          lte: new Decimal(lat + distanceInDegrees),
        },
        lng: {
          gte: new Decimal(lng - distanceInDegrees),
          lte: new Decimal(lng + distanceInDegrees),
        },
      }
    });

    const residencesInstances = residences.map(residence => new Residence({
      ...residence,
      lat: residence.lat.toNumber(),
      lng: residence.lng.toNumber(),
    }));

    return residencesInstances;
  }
}
import { Injectable } from "@nestjs/common";
import { Decimal } from "@prisma/client/runtime/library";
import { Prisma, Residence as ResidencePrisma } from "@prisma/client";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateResidenceDto } from "../../application/dtos/create-house-residence.dto";
import { FindAllResidenceByCoordinatesDto } from "../../application/dtos/find-residence.dto";
import { Residence } from "../../domain/entites/residence.entity";
import { IResidenceRepository } from "../../domain/repositories/residence.repository";
import { ResidenceWithVisitDto } from "../../application/dtos/residence-with-visit.dto";
import { Visit } from "src/modules/visit/domain/entities/visit.entity";

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

  public async findOne(residence: Partial<Residence>): Promise<Residence | null> {
    const whereCondition = Object
    .entries(residence)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      const columnsMapper: Record<keyof Residence, string> = {
        id: `id = ${value}`,
        street: `unaccent("street") ILIKE unaccent('${value}')`,
        number: `number = '${value}'`,
        apartmentNumber: `apartment_number = '${value}'`,
        block: `block = '${value}'`,
        cep: `cep = '${value}'`,
        complement: `unaccent("complement") ILIKE unaccent('${value}')`,
        lat: `lat = ${value}`,
        lng: `lng = ${value}`,
        neighborhood: `neighborhood = '${value}'`,
        streetCourt: `street_court = '${value}'`,
        type: `type = '${value}'`,
        createdAt: `created_at = '${value instanceof Date ? value.toISOString() : value}'`,
        updatedAt: `updated_at = '${value instanceof Date ? value.toISOString() : value}'`
      }

      return columnsMapper[key];
    })
    .join(' AND ');

    const residenceResult = await this.prisma.$queryRaw<ResidencePrisma[]>`
      SELECT
        id,
        type,
        cep,
        lat,
        lng,
        street,
        number,
        neighborhood,
        street_court as "streetCourt",
        block,
        complement,
        apartment_number as "apartmentNumber",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM "residence"
      WHERE ${Prisma.raw(whereCondition)}
      LIMIT 1;
    `;

    if (!residenceResult.length) {
      return null;
    }

    const residenceInstance = new Residence({
      ...residenceResult[0],
      lat: residenceResult[0].lat.toNumber(),
      lng: residenceResult[0].lng.toNumber(),
    });


    return residenceInstance;
  }

  public async exitsById(id: number): Promise<boolean> {
    const residence = await this.prisma.residence.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      }
    });

    return !!residence;
  }

  public async update(residence: Residence): Promise<Residence> {
    const { id, ...residenceWithoutId } = residence;

    const residenceUpdated = await this.prisma.residence.update({
      where: { id },
      data: residenceWithoutId
    });

    return new Residence({
      ...residenceUpdated,
      lat: residenceUpdated.lat.toNumber(),
      lng: residenceUpdated.lng.toNumber(),
    });
  }

  public async findById(id: number): Promise<Residence | null> {
    const residence = await this.prisma.residence.findUnique({
      where: { id }
    });

    if (!residence) {
      return null;
    }

    const residenceInstance = new Residence({
      ...residence,
      lat: residence.lat.toNumber(),
      lng: residence.lng.toNumber(),
    });

    return residenceInstance;
  }

  public async findAllWithLatestVisit(): Promise<ResidenceWithVisitDto[]> {
    const residences = await this.prisma.residence.findMany({
      include: {
        Visit: {
          orderBy: { endedAt: "desc" },
          take: 1,
        }
      }
    });

    const residencesInstances = residences.map(residence => {
      const residenceInstance = new ResidenceWithVisitDto({
        ...residence,
        lat: residence.lat.toNumber(),
        lng: residence.lng.toNumber(),
      });

      // @ts-ignore
      residenceInstance.visit = residence.Visit.length ? new Visit(residence.Visit[0]) : null;

      return residenceInstance;
    });

    return residencesInstances;
  }

}
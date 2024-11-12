import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateResidenceDto } from "../../application/dtos/create-residence.dto";
import { Residence } from "../../domain/entites/residence.entity";
import { IResidenceRepository } from "../../domain/repositories/residence.repository";

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
}
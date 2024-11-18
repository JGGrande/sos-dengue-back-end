import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { IVisitRepository } from "../../domain/repositories/visit.repository";
import { CreateVisitDto } from "../../application/dtos/create-visit.dto";

@Injectable()
export class PrismaVisitRepository implements IVisitRepository {
  constructor(
    private readonly prisma: PrismaService
  ){ }

  public async create(createVisitDto: CreateVisitDto): Promise<void> {
    await this.prisma.visit.create({
      data: createVisitDto,
      select: {
        id: true,
      }
    });
  }
}
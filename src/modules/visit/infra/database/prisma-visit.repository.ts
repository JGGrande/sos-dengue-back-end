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

  public async countByUserIdAndStartedAtBetweenDate(userId: number, startDate: Date, endDate: Date): Promise<number> {
    const count = await this.prisma.visit.count({
      where: {
        userId,
        startedAt: {
          gte: startDate,
          lte: endDate,
        }
      }
    });

    return count;
  }

  public async countFociFoundByUserIdAndStartedAtBetweenDate(userId: number, startDate: Date, endDate: Date): Promise<number> {
    const count = await this.prisma.visit.count({
      where: {
        userId,
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
        sample: { not: null}
      }
    });

    return count;
  }
}
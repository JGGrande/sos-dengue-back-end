import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateVisitDto } from "../../application/dtos/create-visit.dto";
import { VisitWithUserAndResidenceDto } from "../../application/dtos/visit-with-user-and-residence.dto";
import { IVisitRepository } from "../../domain/repositories/visit.repository";
import { PrismaVisitMapper } from "./prisma-visit.mapper";

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
    const countResult = await this.prisma.visit.findMany({
      where: {
        userId,
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
        sample: { not: null }
      }
    });

    const count = countResult.reduce((acc, visit) => {
      //@ts-ignore
      if (visit.sample?.tubeCount) {
        //@ts-ignore
        return acc + visit.sample?.tubeCount;
      }

      return acc;
    }, 0);

    return count;
  }

  public async findAllByResidenceId(residenceId: number): Promise<VisitWithUserAndResidenceDto[]> {
    const visits = await this.prisma.visit.findMany({
      where: {
        residenceId
      },
      include: {
        user: true,
        residence: true,
      },
      orderBy: {
        startedAt: 'desc'
      }
    });

    return PrismaVisitMapper.toDomainWithUserAndResidence(visits);
  }
}
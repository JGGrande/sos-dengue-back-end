import { Inject, Injectable } from "@nestjs/common";

import { IVisitRepository, VisitRepositoryToken } from "../../domain/repositories/visit.repository";
import { DateProviderToken, IDateProvider } from "src/shared/providers/interface/date.provider";
import { CreateVisitaByRequestDto } from "../dtos/create-visit.dto";

@Injectable()
export class CreateVisitService {
  constructor(
    @Inject(VisitRepositoryToken)
    private readonly visitRepository: IVisitRepository,
    @Inject(DateProviderToken)
    private readonly dateProvider: IDateProvider
  ) { }

  async execute(createVisitDto: CreateVisitaByRequestDto): Promise<void> {
    const visitStartedAt = this.dateProvider.parseISO(createVisitDto.startedAt);
    const visitEndedAt = this.dateProvider.parseISO(createVisitDto.endedAt);

    await this.visitRepository.create({
      ...createVisitDto,
      startedAt: visitStartedAt,
      endedAt: visitEndedAt,
    });
  }
}
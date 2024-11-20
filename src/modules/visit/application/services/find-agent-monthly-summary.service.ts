import { Inject, Injectable } from "@nestjs/common";
import { IVisitRepository, VisitRepositoryToken } from "../../domain/repositories/visit.repository";
import { DateProviderToken, IDateProvider } from "src/shared/providers/interface/date.provider";

@Injectable()
export class FindAgentMonthlySummaryService {
  constructor(
    @Inject(VisitRepositoryToken)
    private readonly visitRepository: IVisitRepository,
    @Inject(DateProviderToken)
    private readonly dateProvider: IDateProvider
  ) { }

  async execute(userId: number): Promise<{ visitasCount: number; focosCount: number }>{
    const currentDate = new Date();

    const startDate = this.dateProvider.firstDayOfMonth(currentDate);
    const endDate = this.dateProvider.lastDayOfMonth(currentDate);

    const [ visitasCount, focosCount ] = await Promise.all([
      this.visitRepository.countByUserIdAndStartedAtBetweenDate(userId, startDate, endDate),
      this.visitRepository.countFociFoundByUserIdAndStartedAtBetweenDate(userId, startDate, endDate)
    ]);

    return { visitasCount, focosCount };
  }
}
import { ConflictException, Inject, Injectable } from "@nestjs/common";

import { IVisitRepository, VisitRepositoryToken } from "../../domain/repositories/visit.repository";
import { DateProviderToken, IDateProvider } from "src/shared/providers/interface/date.provider";
import { CreateVisitaByRequestDto } from "../dtos/create-visit.dto";
import { UserRepository, UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { IResidenceRepository, ResidenceRepositoryToken } from "src/modules/residence/domain/repositories/residence.repository";

@Injectable()
export class CreateVisitService {
  constructor(
    @Inject(VisitRepositoryToken)
    private readonly visitRepository: IVisitRepository,
    @Inject(DateProviderToken)
    private readonly dateProvider: IDateProvider,
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(ResidenceRepositoryToken)
    private readonly residenceRepository: IResidenceRepository,
  ) { }

  async execute(createVisitDto: CreateVisitaByRequestDto): Promise<void> {
    const visitStartedAt = this.dateProvider.parseISO(createVisitDto.startedAt);
    const visitEndedAt = this.dateProvider.parseISO(createVisitDto.endedAt);

    const user = await this.userRepository.findById(createVisitDto.userId);

    if(!user) {
      throw new ConflictException('Usuário não encontrado.');
    }

    const residence = await this.residenceRepository.exitsById(createVisitDto.residenceId);

    if(!residence) {
      throw new ConflictException('Residência não encontrada.');
    }

    await this.visitRepository.create({
      ...createVisitDto,
      startedAt: visitStartedAt,
      endedAt: visitEndedAt,
    });
  }
}
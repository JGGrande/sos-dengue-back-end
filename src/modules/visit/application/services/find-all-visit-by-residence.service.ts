import { Inject, Injectable } from "@nestjs/common";
import { IVisitRepository, VisitRepositoryToken } from "../../domain/repositories/visit.repository";
import { VisitWithUserAndResidenceDto } from "../dtos/visit-with-user-and-residence.dto";

@Injectable()
export class FindAllVisitByResidenceService {
  constructor(
    @Inject(VisitRepositoryToken)
    private readonly visitRepository: IVisitRepository
  ) { }

  async execute(residenceId: number): Promise<VisitWithUserAndResidenceDto[]> {
    return this.visitRepository.findAllByResidenceId(residenceId);
  }

}
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateVisitaByRequestDto } from "src/modules/visit/application/dtos/create-visit.dto";
import { CreateVisitService } from "src/modules/visit/application/services/create-visit.service";
import { FindAgentMonthlySummaryService } from "src/modules/visit/application/services/find-agent-monthly-summary.service";
import { FindAllVisitByResidenceService } from "src/modules/visit/application/services/find-all-visit-by-residence.service";
import { ParamId } from "src/shared/decorators/param-id.decorator";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { FindAllVisitByResidencePresenter } from "../presenters/find-all-visit-by-residence.presenter";

@UseGuards(AuthGuard)
@Controller('visits')
export class VisitController {
  constructor(
    private readonly createVisitService: CreateVisitService,
    private readonly findAgentMonthlySummaryService: FindAgentMonthlySummaryService,
    private readonly findAllVisitByResidenceService: FindAllVisitByResidenceService
  ) { }

  @Post()
  public async create(@Body() createVisitDto: CreateVisitaByRequestDto): Promise<void> {
    await this.createVisitService.execute(createVisitDto);
  }

  @Get('agent/:userId/monthly-summary')
  public async findAgentMonthlySummary(@ParamId("userId") userId: number) {
    return this.findAgentMonthlySummaryService.execute(userId);
  }

  @Get('residence/:residenceId')
  public async findAllByResidence(@ParamId("residenceId") residenceId: number) {
    const visits = await this.findAllVisitByResidenceService.execute(residenceId);

    return FindAllVisitByResidencePresenter.toHttpResponse(visits);
  }
}
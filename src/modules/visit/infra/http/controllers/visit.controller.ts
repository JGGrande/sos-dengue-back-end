import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateVisitaByRequestDto } from "src/modules/visit/application/dtos/create-visit.dto";
import { CreateVisitService } from "src/modules/visit/application/services/create-visit.service";
import { FindAgentMonthlySummaryService } from "src/modules/visit/application/services/find-agent-monthly-summary.service";
import { ParamId } from "src/shared/decorators/param-id.decorator";
import { AuthGuard } from "src/shared/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('visits')
export class VisitController {
  constructor(
    private readonly createVisitService: CreateVisitService,
    private readonly findAgentMonthlySummaryService: FindAgentMonthlySummaryService
  ) { }

  @Post()
  public async create(@Body() createVisitDto: CreateVisitaByRequestDto): Promise<void> {
    await this.createVisitService.execute(createVisitDto);
  }

  @Get('agent/:userId/monthly-summary')
  public async findAgentMonthlySummary(@ParamId("userId") userId: number) {
    return this.findAgentMonthlySummaryService.execute(userId);
  }
}
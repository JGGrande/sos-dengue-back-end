import { Module } from "@nestjs/common";
import { CreateVisitService } from "./application/services/create-visit.service";
import { DIContainer } from "./infra/di/visit.container";
import { VisitController } from "./infra/http/controllers/visit.controller";
import { FindAgentMonthlySummaryService } from "./application/services/find-agent-monthly-summary.service";

@Module({
  imports: [ DIContainer ],
  controllers: [ VisitController ],
  providers: [
    CreateVisitService,
    FindAgentMonthlySummaryService
  ],
})
export class VisitModule { }
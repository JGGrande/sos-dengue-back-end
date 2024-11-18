import { Module } from "@nestjs/common";
import { CreateVisitService } from "./application/services/create-visit.service";
import { DIContainer } from "./infra/di/visit.container";
import { VisitController } from "./infra/http/controllers/visit.controller";

@Module({
  imports: [ DIContainer ],
  controllers: [ VisitController ],
  providers: [
    CreateVisitService
  ],
})
export class VisitModule { }
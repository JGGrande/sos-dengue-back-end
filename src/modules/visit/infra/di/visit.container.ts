import { Module, Provider, Scope } from "@nestjs/common";

import { PrismaModule } from "src/shared/prisma/prisma.module";
import { PrismaService } from "src/shared/prisma/prisma.service";

import { VisitRepositoryToken } from "../../domain/repositories/visit.repository";
import { PrismaVisitRepository } from "../database/prisma-visit.repository";

import { DateProviderToken } from "src/shared/providers/interface/date.provider";
import { DateFnsProvider } from "src/shared/providers/implementation/date-fns.provider";

const DatabaseProvider: Provider = {
  provide: VisitRepositoryToken,
  useClass: PrismaVisitRepository,
  scope: Scope.REQUEST
}

const DateProvider: Provider = {
  provide: DateProviderToken,
  useClass: DateFnsProvider
}

@Module({
  imports: [ PrismaModule ],
  providers: [
    DatabaseProvider,
    PrismaService,
    DateProvider,
    DateFnsProvider,
  ],
  exports: [
    DatabaseProvider,
    DateProvider
  ]
})
export class DIContainer { }
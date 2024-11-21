import { Module, Provider, Scope } from "@nestjs/common";

import { PrismaModule } from "src/shared/prisma/prisma.module";
import { PrismaService } from "src/shared/prisma/prisma.service";

import { VisitRepositoryToken } from "../../domain/repositories/visit.repository";
import { PrismaVisitRepository } from "../database/prisma-visit.repository";

import { DateProviderToken } from "src/shared/providers/interface/date.provider";
import { DateFnsProvider } from "src/shared/providers/implementation/date-fns.provider";

import { UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { PrismaUserRepository } from "src/modules/user/infra/database/prisma-user.repository";
import { ResidenceRepositoryToken } from "src/modules/residence/domain/repositories/residence.repository";
import { PrismaResidenceRepository } from "src/modules/residence/infra/database/prisma-residence.repository";

const DatabaseProvider: Provider = {
  provide: VisitRepositoryToken,
  useClass: PrismaVisitRepository,
  scope: Scope.REQUEST
}

const DateProvider: Provider = {
  provide: DateProviderToken,
  useClass: DateFnsProvider
}

const UserRepositoryProvider: Provider = {
  provide: UserRepositoryToken,
  useClass: PrismaUserRepository,
  scope: Scope.REQUEST
}

const ResidenceRepositoryProvider: Provider = {
  provide: ResidenceRepositoryToken,
  useClass: PrismaResidenceRepository,
  scope: Scope.REQUEST
}

@Module({
  imports: [ PrismaModule ],
  providers: [
    DatabaseProvider,
    PrismaService,
    DateProvider,
    DateFnsProvider,
    UserRepositoryProvider,
    ResidenceRepositoryProvider
  ],
  exports: [
    DatabaseProvider,
    DateProvider,
    UserRepositoryProvider,
    ResidenceRepositoryProvider
  ]
})
export class DIContainer { }
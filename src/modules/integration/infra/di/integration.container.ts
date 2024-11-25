import { Module, Provider, Scope } from "@nestjs/common";
import { ResidenceRepositoryToken } from "src/modules/residence/domain/repositories/residence.repository";
import { PrismaResidenceRepository } from "src/modules/residence/infra/database/prisma-residence.repository";
import { PrismaModule } from "src/shared/prisma/prisma.module";
import { PrismaService } from "src/shared/prisma/prisma.service";

const ResidenceDatabaseProvider: Provider = {
  provide: ResidenceRepositoryToken,
  scope: Scope.REQUEST,
  useClass: PrismaResidenceRepository,
}

@Module({
  imports: [
    PrismaModule
  ],
  providers: [
    ResidenceDatabaseProvider,
    PrismaService,
  ],
  exports: [
    ResidenceDatabaseProvider
  ]

})
export class DIContainer { }
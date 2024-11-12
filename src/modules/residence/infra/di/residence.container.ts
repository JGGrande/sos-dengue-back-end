import { Module, Provider, Scope } from "@nestjs/common";
import { ResidenceRepositoryToken } from "../../domain/repositories/residence.repository";
import { PrismaResidenceRepository } from "../database/prisma-residence.repository";
import { PrismaModule } from "src/shared/prisma/prisma.module";

const DatabaseProvider: Provider = {
  provide: ResidenceRepositoryToken,
  scope: Scope.REQUEST,
  useClass: PrismaResidenceRepository,
};

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [
    DatabaseProvider,
  ],
  exports: [
    DatabaseProvider,
  ],
})
export class DIContainer { }

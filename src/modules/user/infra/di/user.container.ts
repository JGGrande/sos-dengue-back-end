import { Module, Provider, Scope } from "@nestjs/common";
import { PrismaUserRepository } from "../database/prisma-user.repository";
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { PrismaModule } from "src/shared/prisma/prisma.module";
import { BcryptProvider } from "src/shared/providers/implementation/bcrypt.provider";
import { HashProviderToken } from "src/shared/providers/interface/hash.provider";
import { UserRepositoryToken } from "../../domain/repositories/user.repository";
import { MailerModule } from "@nestjs-modules/mailer";

const DatabaseProvider: Provider = {
  provide: UserRepositoryToken,
  scope: Scope.REQUEST,
  useClass: PrismaUserRepository,
};

const HashProvider: Provider = {
  provide: HashProviderToken,
  useClass: BcryptProvider,
}

@Module({
  imports: [
    PrismaModule,
    MailerModule
  ],
  providers: [DatabaseProvider, HashProvider],
  exports: [DatabaseProvider, HashProvider],
})
export class DIContainer {}
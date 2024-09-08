import { MailerModule } from "@nestjs-modules/mailer";
import { Module, Provider, Scope } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { PrismaUserRepository } from "src/modules/user/infra/database/prisma-user.repository";
import { Env } from "src/shared/config/config.module";
import { PrismaModule } from "src/shared/prisma/prisma.module";
import { BcryptProvider } from "src/shared/providers/implementation/bcrypt.provider";
import { HashProviderToken } from "src/shared/providers/interface/hash.provider";

const UserDatabaseProvider: Provider = {
  provide: UserRepositoryToken,
  scope: Scope.REQUEST,
  useClass: PrismaUserRepository,
};

const HashProvider: Provider = {
  provide: HashProviderToken,
  useClass: BcryptProvider,
}

const {
  AUTH_TOKEN_SECRET,
  AUTH_TOKEN_EXPIRES_IN
} = process.env as Env;

const AuthTokenOptions: JwtModuleOptions = {
  global: true,
  secret: AUTH_TOKEN_SECRET,
  signOptions: {
    expiresIn: AUTH_TOKEN_EXPIRES_IN,
    subject: "auth"
  }
}

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    JwtModule.register(AuthTokenOptions),
  ],
  providers: [ UserDatabaseProvider, HashProvider ],
  exports: [ UserDatabaseProvider, HashProvider ],
})
export class DIContainer { }
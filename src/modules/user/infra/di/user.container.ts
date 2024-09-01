import { Module, Provider, Scope } from "@nestjs/common";
import { PrismaUserRepository } from "../database/prisma-user.repository";
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { PrismaModule } from "src/shared/prisma/prisma.module";
import { BcryptProvider } from "src/shared/providers/implementation/bcrypt.provider";
import { HashProviderToken } from "src/shared/providers/interface/hash.provider";
import { UserRepositoryToken } from "../../domain/repositories/user.repository";
import { MailerModule } from "@nestjs-modules/mailer";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { Env } from "src/shared/config/config.module";

const DatabaseProvider: Provider = {
  provide: UserRepositoryToken,
  scope: Scope.REQUEST,
  useClass: PrismaUserRepository,
};

const HashProvider: Provider = {
  provide: HashProviderToken,
  useClass: BcryptProvider,
}

const { VERIFY_EMAIL_TOKEN_SECRET, VERIFY_EMAIL_TOKEN_EXPIRES_IN } = process.env as Env;

const VerifyEmailTokenOptions: JwtModuleOptions = {
  global: true,
  secret: VERIFY_EMAIL_TOKEN_SECRET,
  signOptions: {
    expiresIn: VERIFY_EMAIL_TOKEN_EXPIRES_IN,
    subject: "verify-email"
  }
}

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    JwtModule.register(VerifyEmailTokenOptions),
  ],
  providers: [DatabaseProvider, HashProvider],
  exports: [DatabaseProvider, HashProvider],
})
export class DIContainer {}
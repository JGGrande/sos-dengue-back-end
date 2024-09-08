import { Module } from "@nestjs/common";
import { DIContainer } from "./infra/di/auth.container";
import { AuthController } from "./infra/http/controllers/auth.controller";
import { AuthUserService } from "./application/services/auth-user.service";

@Module({
  imports: [ DIContainer ],
  controllers: [ AuthController ],
  providers: [
    AuthUserService
  ],
})
export class AuthModule {}
import { Module } from "@nestjs/common";
import { DIContainer } from "./infra/di/auth.container";
import { AuthController } from "./infra/http/controllers/auth.controller";
import { AuthUserService } from "./application/services/auth-user.service";
import { RefreshTokenUserService } from "./application/services/refresh-token-user.service";

@Module({
  imports: [ DIContainer ],
  controllers: [ AuthController ],
  providers: [
    AuthUserService,
    RefreshTokenUserService
  ],
})
export class AuthModule {}
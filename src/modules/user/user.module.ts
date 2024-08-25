import { Module } from '@nestjs/common';
import { UserController } from './infra/http/controller/user.controller';
import { CreateUserService } from './application/services/create-user.service';
import { DIContainer } from './infra/di/user.container';
import { FindAllUserService } from './application/services/find-all-user.service';

@Module({
  imports: [ DIContainer ],
  controllers: [ UserController ],
  providers: [
    CreateUserService,
    FindAllUserService
  ]
})
export class UserModule {}

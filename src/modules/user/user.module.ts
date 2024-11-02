import { Module } from '@nestjs/common';
import { CreateUserService } from './application/services/create-user.service';
import { FindAllUserService } from './application/services/find-all-user.service';
import { FindUserByIdService } from './application/services/find-user-by-id.service';
import { DIContainer } from './infra/di/user.container';
import { UserController } from './infra/http/controller/user.controller';
import { UpdateUserService } from './application/services/update-user.service';
import { UpdateUserEmailService } from './application/services/update-user-email.service';
import { VerifyUserEmailService } from './application/services/verify-user-email.service';
import { DeleteUserService } from './application/services/delete-user.service';
import { UpdateUserPhotoService } from './application/services/update-user-photo.service';

@Module({
  imports: [ DIContainer ],
  controllers: [ UserController ],
  providers: [
    CreateUserService,
    FindAllUserService,
    FindUserByIdService,
    UpdateUserService,
    UpdateUserEmailService,
    VerifyUserEmailService,
    UpdateUserPhotoService,
    DeleteUserService
  ]
})
export class UserModule {}

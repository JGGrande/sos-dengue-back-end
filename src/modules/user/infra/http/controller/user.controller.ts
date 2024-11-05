import { join } from 'path';
import { createReadStream } from 'fs';
import { FastifyReply } from "fastify";
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { File } from 'src/@types/utils';
import { CreateUserByRequestDto } from 'src/modules/user/application/dto/create-user.dto';
import { UpdateUserEmailDto } from 'src/modules/user/application/dto/update-user-email.dto';
import { UpdateUserDto } from 'src/modules/user/application/dto/update-user.dto';
import { CreateUserService } from 'src/modules/user/application/services/create-user.service';
import { DeleteUserService } from 'src/modules/user/application/services/delete-user.service';
import { FindAllUserService } from 'src/modules/user/application/services/find-all-user.service';
import { FindUserByIdService } from 'src/modules/user/application/services/find-user-by-id.service';
import { UpdateUserEmailService } from 'src/modules/user/application/services/update-user-email.service';
import { UpdateUserPhotoService } from 'src/modules/user/application/services/update-user-photo.service';
import { UpdateUserService } from 'src/modules/user/application/services/update-user.service';
import { VerifyUserEmailService } from 'src/modules/user/application/services/verify-user-email.service';
import { directory } from 'src/shared/config/user-photo.config';
import { ParamId } from 'src/shared/decorators/param-id.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateUserPresent } from '../presenter/create-user.presenter';
import { FindAllUserPresent } from '../presenter/find-all-user.presenter';
import { FindUserByIdPresent } from '../presenter/find-user-by-id.presenter';
import { UpdateUserPresent } from '../presenter/update-user.presenter';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/modules/user/domain/entities/user-roles.enum';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUserService: FindAllUserService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserEmailService: UpdateUserEmailService,
    private readonly verifyUserEmailService: VerifyUserEmailService,
    private readonly updateUserPhotoService: UpdateUserPhotoService,
    private readonly deleteUserService: DeleteUserService
  ) { }

  @Public()
  @Post()
  public async create(@Body() createUserDto: CreateUserByRequestDto) {
    const user = await this.createUserService.execute(createUserDto);

    return CreateUserPresent.toHttpResponse(user);
  }

  @Roles(Role.ADMIN)
  @Get()
  public async findAll() {
    const users = await this.findAllUserService.execute();

    return FindAllUserPresent.toHttpResponse(users);
  }

  @Roles(Role.ADMIN, Role.AGENTE)
  @Get(":id")
  public async findById(@ParamId() id: number) {
    const user = await this.findUserByIdService.execute(id);

    return FindUserByIdPresent.toHttpResponse(user);
  }

  @Roles(Role.ADMIN, Role.AGENTE)
  @Put(":id")
  public async update(@ParamId() id: number, @Body() bodyData: UpdateUserDto) {
    const user = await this.updateUserService.execute({
      id,
      ...bodyData
    });

    return UpdateUserPresent.toHttpResponse(user);
  }

  @Roles(Role.ADMIN, Role.AGENTE)
  @Patch(":id/email")
  public async updateEmail(
    @Req() request,
    @ParamId() id: number,
    @Body() bodyData: UpdateUserEmailDto
  ) {
    const host = request.headers['x-forwarded-host'] || request.hostname;
    const protocol = request.headers['x-forwarded-proto'] || request.protocol;


    await this.updateUserEmailService.execute({
      id,
      host,
      protocol,
      ...bodyData
    });
  }

  @Public()
  @Get("verify-email")
  public async verifyEmail(@Query("token") token?: string) {
    if (!token) {
      throw new BadRequestException("Token é obrigatório");
    }

    await this.verifyUserEmailService.execute(token);
  }

  @Roles(Role.ADMIN, Role.AGENTE)
  @Patch(":id/photo")
  @UseInterceptors(FileInterceptor("photo"))
  public async updatePhoto(
    @UploadedFile(
      new ParseFilePipe({
        errorHttpStatusCode: 400,
        validators: [
          new FileTypeValidator({ fileType: "image/*", }),
          new MaxFileSizeValidator({ maxSize: 5000000 }) // 5 mb
        ]
      })
    ) file: File,
    @ParamId() userId: number,
  ) {
    const updatedUser = await this.updateUserPhotoService.execute(file, userId);

    return UpdateUserPresent.toHttpResponse(updatedUser);
  }

  @Roles(Role.ADMIN, Role.AGENTE)
  @Get(":id/photo")
  public async getPhoto(
    @ParamId() userId: number,
    @Res() res: FastifyReply
  ) {
    const user = await this.findUserByIdService.execute(userId);

    if (!user.photo) {
      return res.status(204).send();
    }

    const photoPath = join(directory, user.photo);

    const photoStream = createReadStream(photoPath);

    const photoExtension = user.photo.split(".").pop();

    return res.type(`image/${photoExtension}`).send(photoStream);
  }

  @Roles(Role.ADMIN, Role.AGENTE)
  @Get("/photo/:photo")
  public async findPhotoByFilename(
    @Param("photo") photo: string,
    @Res() res: FastifyReply
  ) {
    if(!photo) {
      return res.status(204).send();
    }

    const photoPath = join(directory, photo);

    const photoStream = createReadStream(photoPath);

    const photoExtension = photo.split(".").pop();

    return res.type(`image/${photoExtension}`).send(photoStream);
  }

  @Roles(Role.ADMIN)
  @Delete(":id")
  public async delete(@ParamId() id: number) {
    await this.deleteUserService.execute(id);
  }
}
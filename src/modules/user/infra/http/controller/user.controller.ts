import { BadRequestException, Body, Controller, Delete, Get, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { CreateUserByRequestDto } from 'src/modules/user/application/dto/create-user.dto';
import { UpdateUserEmailDto } from 'src/modules/user/application/dto/update-user-email.dto';
import { UpdateUserDto } from 'src/modules/user/application/dto/update-user.dto';
import { CreateUserService } from 'src/modules/user/application/services/create-user.service';
import { DeleteUserService } from 'src/modules/user/application/services/delete-user.service';
import { FindAllUserService } from 'src/modules/user/application/services/find-all-user.service';
import { FindUserByIdService } from 'src/modules/user/application/services/find-user-by-id.service';
import { UpdateUserEmailService } from 'src/modules/user/application/services/update-user-email.service';
import { UpdateUserService } from 'src/modules/user/application/services/update-user.service';
import { VerifyUserEmailService } from 'src/modules/user/application/services/verify-user-email.service';
import { ParamId } from 'src/shared/decorators/param-id.decorator';
import { CreateUserPresent } from '../presenter/create-user.presenter';
import { FindAllUserPresent } from '../presenter/find-all-user.presenter';
import { FindUserByIdPresent } from '../presenter/find-user-by-id.presenter';
import { UpdateUserPresent } from '../presenter/update-user.presenter';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUserService: FindAllUserService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserEmailService: UpdateUserEmailService,
    private readonly verifyUserEmailService: VerifyUserEmailService,
    private readonly deleteUserService: DeleteUserService
  ) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserByRequestDto) {
    const user = await this.createUserService.execute(createUserDto);

    return CreateUserPresent.toHttpResponse(user);
  }

  @Get()
  public async findAll() {
    const users = await this.findAllUserService.execute();

    return FindAllUserPresent.toHttpResponse(users);
  }

  @Get(":id")
  public async findById(@ParamId() id: number) {
    const user = await this.findUserByIdService.execute(id);

    return FindUserByIdPresent.toHttpResponse(user);
  }

  @Put(":id")
  public async update(@ParamId() id: number, @Body() bodyData: UpdateUserDto){
    const user = await this.updateUserService.execute({
      id,
      ...bodyData
    });

    return UpdateUserPresent.toHttpResponse(user);
  }

  @Patch(":id/email")
  public async updateEmail(
    @Req() request,
    @ParamId() id: number,
    @Body() bodyData: UpdateUserEmailDto
  ){
    const host = request.headers['x-forwarded-host'] || request.hostname;

    await this.updateUserEmailService.execute({
      id,
      host,
      ...bodyData
    });
  }

  @Get("verify-email")
  public async verifyEmail(@Query("token") token?: string) {
    if(!token){
      throw new BadRequestException("Token é obrigatório");
    }

    await this.verifyUserEmailService.execute(token);
  }

  @Delete(":id")
  public async delete(@ParamId() id: number){
    await this.deleteUserService.execute(id);
  }
}
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { CreateUserByRequestDto } from 'src/modules/user/application/dto/create-user.dto';
import { CreateUserService } from 'src/modules/user/application/services/create-user.service';
import { FindAllUserService } from 'src/modules/user/application/services/find-all-user.service';
import { CreateUserPresent } from '../present/create-user.present';
import { FindAllUserPresent } from '../present/find-all-user.present';
import { FindUserByIdService } from 'src/modules/user/application/services/find-user-by-id.service';
import { ParamId } from 'src/shared/decorators/param-id.decorator';
import { FindUserByIdPresent } from '../present/find-user-by-id.present';
import { UpdateUserDto } from 'src/modules/user/application/dto/update-user.dto';
import { UpdateUserService } from 'src/modules/user/application/services/update-user.service';
import { UpdateUserPresent } from '../present/update-user.present';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUserService: FindAllUserService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly updateUserService: UpdateUserService
  ) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserByRequestDto) {
    const user = await this.createUserService.execute(createUserDto);

    return CreateUserPresent.toHttpApp(user);
  }

  @Get()
  public async findAll() {
    const users = await this.findAllUserService.execute();

    return FindAllUserPresent.toHttpApp(users);
  }

  @Get(":id")
  public async findById(@ParamId() id: number) {
    const user = await this.findUserByIdService.execute(id);

    return FindUserByIdPresent.toHttpApp(user);
  }

  @Put(":id")
  public async update(@ParamId() id: number, @Body() bodyData: UpdateUserDto){
    const user = await this.updateUserService.execute({
      id,
      ...bodyData
    });

    return UpdateUserPresent.toHttpApp(user);
  }
}
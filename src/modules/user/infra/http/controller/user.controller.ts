import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserByRequestDto } from 'src/modules/user/application/dto/create-user.dto';
import { CreateUserService } from 'src/modules/user/application/services/create-user.service';
import { CreateUserPresent } from '../present/create-user.present';
import { FindAllUserService } from 'src/modules/user/application/services/find-all-user.service';
import { FindAllUserPresent } from '../present/find-all-user.present';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUserService: FindAllUserService
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

}
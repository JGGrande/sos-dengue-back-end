import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserByRequestDto } from 'src/modules/user/application/dto/create-user.dto';
import { CreateUserService } from 'src/modules/user/application/services/create-user.service';
import { CreateUserPresent } from '../present/create-user.present';

@Controller('users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserByRequestDto) {
    const user = await this.createUserService.execute(createUserDto);
    
    return CreateUserPresent.toHttpApp(user);
  }

}
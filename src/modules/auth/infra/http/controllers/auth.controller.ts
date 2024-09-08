import { Body, Controller, Post } from "@nestjs/common";
import { AuthUserDto } from "src/modules/auth/application/dtos/auth-user.dto";
import { AuthUserService } from "src/modules/auth/application/services/auth-user.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserService: AuthUserService
  ) { }

  @Post()
  public async authUser(@Body() authUserDto: AuthUserDto){
    return this.authUserService.execute(authUserDto);
  }

}
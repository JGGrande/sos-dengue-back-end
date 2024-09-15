import { Body, Controller, Post } from "@nestjs/common";
import { AuthUserDto } from "src/modules/auth/application/dtos/auth-user.dto";
import { AuthUserService } from "src/modules/auth/application/services/auth-user.service";
import { RefreshTokenUserService } from '../../../application/services/refresh-token-user.service';
import { RefreshTokenUserDto } from "src/modules/auth/application/dtos/refresh-token-user.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly refreshTokenUserService: RefreshTokenUserService
  ) { }

  @Post("user")
  public async authUser(@Body() authUserDto: AuthUserDto){
    return this.authUserService.execute(authUserDto);
  }

  @Post('user/refresh_token')
  public async refreshTokenUser(@Body() { refreshToken }: RefreshTokenUserDto){
    return this.refreshTokenUserService.execute({ refreshToken });
  }
}
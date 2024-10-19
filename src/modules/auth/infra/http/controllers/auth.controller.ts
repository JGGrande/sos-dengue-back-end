import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthUserDto } from "src/modules/auth/application/dtos/auth-user.dto";
import { AuthUserService } from "src/modules/auth/application/services/auth-user.service";
import { RefreshTokenUserService } from '../../../application/services/refresh-token-user.service';
import { RefreshTokenUserDto } from "src/modules/auth/application/dtos/refresh-token-user.dto";
import { AuthUserPresenter } from "../presenter/auth-user.presenter";
import { RecoverUserPasswordDto } from "src/modules/auth/application/dtos/recover-user-password.dto";
import { RecoverUserPasswordService } from "src/modules/auth/application/services/recover-user-password.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly refreshTokenUserService: RefreshTokenUserService,
    private readonly recoverUserPasswordService: RecoverUserPasswordService
  ) { }

  @Post("user")
  public async authUser(@Body() authUserDto: AuthUserDto){
    const authenticatedUser = await this.authUserService.execute(authUserDto);

    return AuthUserPresenter.toHttpResponse(authenticatedUser);
  }

  @Post("user/recover-password")
  public async recoverUserPassword(
    @Req() request,
    @Body() { email }: RecoverUserPasswordDto,
  ){
    const host = request.headers['x-forwarded-host'] || request.hostname;
    const protocol = request.headers['x-forwarded-proto'] || request.protocol;

    await this.recoverUserPasswordService.execute({
      email,
      host,
      protocol
    });

    const message = "Solicitação recebida, se o e-mail estiver registrado, você receberá instruções de recuperação em breve.";

    return {
      message
    }
  }

  @Post('user/refresh_token')
  public async refreshTokenUser(@Body() { refreshToken }: RefreshTokenUserDto){
    return this.refreshTokenUserService.execute({ refreshToken });
  }
}
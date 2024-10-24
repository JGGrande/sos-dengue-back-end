import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserRepository, UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { QueueService } from "src/shared/queue/queue.service";

type Request = {
  email: string;
  host: string;
  protocol: string;
}

@Injectable()
export class RecoverUserPasswordService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ){ }

  async execute({ email, host, protocol }: Request): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if(!user){
      return;
    }

    const tokenPayload = { id: user.id };
    const EMAIL_TOKEN_SECRET = this.configService.get<string>("VERIFY_EMAIL_TOKEN_SECRET");
    const EMAIL_TOKEN_EXPIRES_IN = this.configService.get<string>("VERIFY_EMAIL_TOKEN_EXPIRES_IN");

    const token = this.jwtService.sign(
      tokenPayload,
      {
        secret: EMAIL_TOKEN_SECRET,
        expiresIn: EMAIL_TOKEN_EXPIRES_IN
      }
    );

    const encodedToken = encodeURIComponent(token);

    const urlToRecoverPassword = `${protocol}://${host}/api/auth/user/change-password?token=${encodedToken}`;

    await this.queueService.addEmailJob({
      to: user.email,
      subject: "Recuperar senha",
      context: {
        name: user.name,
        urlToRecoverPassword
      },
      template: "recover-password.template.hbs",
    });

  }
}
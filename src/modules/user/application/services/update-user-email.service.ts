import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";

interface IRequest {
  id: number;
  newEmail: string;
  host: string;
}

@Injectable()
export class UpdateUserEmailService {
  constructor(
    private readonly emailProvider: MailerService,
    private readonly jwtProvider: JwtService
  ){ }

  async execute({ id, host, newEmail }: IRequest): Promise<void> {
    const tokenPayload = {
      id,
      newEmail
    }

    const token = await this.jwtProvider.signAsync(tokenPayload);

    const encodedToken = encodeURIComponent(token);

    const urlToVerify = `http://${host}/api/users/verify-email?token=${encodedToken}`;

    await this.emailProvider.sendMail({
      to: newEmail,
      subject: "verify email",
      context: {
        name: "João",
        urlToVerify
      },
      template: "verify-email.template.hbs",
    });
  }
}
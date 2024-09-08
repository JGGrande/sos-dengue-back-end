import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository, UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { HashProvider, HashProviderToken } from "src/shared/providers/interface/hash.provider";

interface IRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly emailProvider: MailerService,
    private readonly jwtService: JwtService,
    @Inject(HashProviderToken)
    private readonly hashProvider: HashProvider
  ){ }

  async execute({ email, password }: IRequest){
    const user = await this.userRepository.findByEmail(email);

    if(!user){
      throw new BadRequestException("Usuário ou senha inválidos!");
    }

    const passwordMatch = await this.hashProvider.compare(password, user.password);

    if(!passwordMatch){
      throw new BadRequestException("Usuário ou senha inválidos!");
    }

    const tokenPayload = { id: user.id };

    const token = await this.jwtService.signAsync(tokenPayload);

    const ocurredAt = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date());

    await this.emailProvider.sendMail({
      to: email,
      subject: "Login",
      context: {
        name: user.name,
        ocurredAt: ocurredAt
      },
      template: "notify-login.template.hbs",
    });

    return { user, token };
  }
}
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { QueueService } from "src/shared/queue/queue.service";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";

interface IRequest {
  id: number;
  newEmail: string;
  host: string;
  protocol: string;
}

@Injectable()
export class UpdateUserEmailService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly queueService: QueueService,
    private readonly jwtProvider: JwtService
  ){ }

  async execute({ id, host, newEmail, protocol }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(id);

    if(!user){
      throw new NotFoundException("Usuário não encontrado.");
    }

    const tokenPayload = {
      id,
      newEmail
    }

    const token = await this.jwtProvider.signAsync(tokenPayload);

    const encodedToken = encodeURIComponent(token);

    const urlToVerify = `${protocol}://${host}/api/users/verify-email?token=${encodedToken}`;

    await this.queueService.addEmailJob({
      to: newEmail,
      subject: "verify email",
      context: {
        name: user.name,
        urlToVerify
      },
      template: "verify-email.template.hbs",
    });
  }
}
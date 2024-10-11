import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";

type Payload = {
  id: number;
  newEmail: string;
}

@Injectable()
export class VerifyUserEmailService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly jwtProvider: JwtService
  ){ }

  async execute(token: string): Promise<void> {
    let payload: Payload = null;

    try{
      payload = this.jwtProvider.verify(token);
    } catch (error) {
      throw new UnauthorizedException("Token invalido");
    }

    const { id, newEmail } = payload;

    await this.userRepository.updateEmail(id, newEmail);
  }
}
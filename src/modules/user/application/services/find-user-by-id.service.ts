import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";

@Injectable()
export class FindUserByIdService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ){}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if(!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }
}
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";

@Injectable()
export class RestoreUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ){ }

  async execute(id: number){
    const user = await this.userRepository.findByIdWithDeleted(id);

    if(!user){
      throw new NotFoundException("Usuário não encontrado.");
    }

    user.deletedAt = null;

    await this.userRepository.update(user);
  }

}
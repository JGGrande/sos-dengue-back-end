import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ){ }

  async execute(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
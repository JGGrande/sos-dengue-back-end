import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";

@Injectable()
export class FindAllUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ){}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
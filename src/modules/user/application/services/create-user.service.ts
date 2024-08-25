import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";
import { HashProvider, HashProviderToken } from "src/shared/providers/interface/hash.provider";
import { Env } from "src/shared/config/config.module";
import { User } from "../../domain/entities/user.entity";

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(HashProviderToken)
    private readonly hashProvider: HashProvider
  ){}

  async execute({ name, cpf, email, password }:IRequest): Promise<User> {
    const emailAlreadyExists = await this.userRepository.emailExists(email);

    if(emailAlreadyExists) {
      throw new ConflictException('Email already exists.');
    }

    const cpfAlreadyExits = await this.userRepository.cpfExists(cpf);

    if(cpfAlreadyExits){
      throw new ConflictException("CPF already exits.")
    }

    const passwordHashed = await this.hashProvider.hash(password);

    const user = await this.userRepository.create({
      name,
      cpf,
      email,
      password: passwordHashed,
    });

    return user;
  }
}
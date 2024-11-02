import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";
import { HashProvider, HashProviderToken } from "src/shared/providers/interface/hash.provider";
import { User } from "../../domain/entities/user.entity";
import { ConfigService } from "@nestjs/config";

type Request = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  photo?: string;
  role: string;
}

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(HashProviderToken)
    private readonly hashProvider: HashProvider,
    private readonly configService: ConfigService
  ){}

  async execute({ name, cpf, email, password, role, photo }:Request): Promise<User> {
    const emailAlreadyExists = await this.userRepository.emailExists(email);

    if(emailAlreadyExists) {
      throw new ConflictException('Email already exists.');
    }

    const cpfAlreadyExits = await this.userRepository.cpfExists(cpf);

    if(cpfAlreadyExits){
      throw new ConflictException("CPF already exits.")
    }

    const salt = this.configService.get<number>("PASSWORD_SALT");

    const passwordHashed = await this.hashProvider.hash(password, salt);

    const defaultUserPhotoFileName = "default-user-photo.png";

    const user = await this.userRepository.create({
      name,
      cpf,
      email,
      password: passwordHashed,
      role,
      photo: defaultUserPhotoFileName
    });

    return user;
  }
}
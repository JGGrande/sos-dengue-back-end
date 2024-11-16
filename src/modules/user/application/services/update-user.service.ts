import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { HashProvider, HashProviderToken } from "src/shared/providers/interface/hash.provider";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";
import { ConfigService } from "@nestjs/config";

type Request = {
  id: number;
  name?: string;
  cpf?: string;
  password?: string;
  email?: string;
  role?: string;
}

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(HashProviderToken)
    private readonly hashProvider: HashProvider,
    private readonly configService: ConfigService
  ){}

  async execute({ id, name, cpf, password, role, email }: Request){
    const user = await this.userRepository.findById(id);

    if(!user){
      throw new NotFoundException("Usuário não encontrado.");
    }

    if(name) user.name = name;

    if(email) user.email = email;

    if(role) user.role = role;

    if(cpf){
      const userWithCpf = await this.userRepository.findIdByCpf(cpf);

      if(userWithCpf){
        const cpfAlreadyExitsWithAnotherUser = user.id !== userWithCpf?.id;

        if(cpfAlreadyExitsWithAnotherUser){
          throw new ConflictException("Esse CPF já está sendo utilizado.");
        }
      }

      user.cpf = cpf;
    }

    if(password){
      const salt = this.configService.get<number>("PASSWORD_SALT");

      const passwordHashed = await this.hashProvider.hash(password, salt);

      user.password = passwordHashed;
    }

    const userUpdated = await this.userRepository.update(user);

    return userUpdated;
  }

}
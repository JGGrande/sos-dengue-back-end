import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";

interface IRequest {
  id: number;
  name?: string;
  cpf?: string;
}

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ){}

  async execute({ id, name, cpf }: IRequest){
    const user = await this.userRepository.findById(id);

    if(!user){
      throw new NotFoundException("Usuário não encontrado.");
    }

    if(name) user.name = name;

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

    const userUpdated = await this.userRepository.update(user);

    return userUpdated;
  }

}
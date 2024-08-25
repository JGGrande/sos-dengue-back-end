import { CreateUserDto } from '../../application/dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  emailExists(email: string): Promise<boolean>;
  cpfExists(cpf: string): Promise<boolean>;
  create({}: CreateUserDto): Promise<User>;
}

export const UserRepositoryToken = Symbol('UserRepository');
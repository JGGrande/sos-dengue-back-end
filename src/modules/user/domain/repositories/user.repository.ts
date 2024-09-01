import { CreateUserDto } from '../../application/dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  emailExists(email: string): Promise<boolean>;
  cpfExists(cpf: string): Promise<boolean>;

  create({}: CreateUserDto): Promise<User>;
  update({}: User): Promise<User>;
  updateEmail(id: number, newEmail: string): Promise<void>;

  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findIdByEmail(email: string): Promise<{ id: number } | null>;
  findIdByCpf(cpf: string): Promise<{ id: number } | null>;
}

export const UserRepositoryToken = Symbol('UserRepository');
import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public async emailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: { id: true }
    });

    return !!user;
  }

  public async cpfExists(cpf: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { cpf },
      select: { id: true }
    });
    return !!user;
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = await this.prisma.user.create({
      data: createUserDto
    });

    const user = new User(userData);

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: {}
      }
    });

    return users.map(user => new User(user));
  }

  public async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user ? new User(user) : null;
  }

  public async findByIdWithDeleted(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: {}
      }
    });

    return user ? new User(user) : null;
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { cpf }
    });

    return user ? new User(user) : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    return user ? new User(user) : null;
  }

  public async findIdByEmail(email: string): Promise<{ id: number; } | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: { id: true },
    });

    return user;
  }

  public async findIdByCpf(cpf: string): Promise<{ id: number; } | null> {
    const user = await this.prisma.user.findFirst({
      where: { cpf },
      select: { id: true },
    });

    return user;
  }

  public async update({ id, cpf, name, password, photo, role, email, deletedAt }: User): Promise<User> {
    const userData = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        cpf,
        password,
        photo,
        role,
        email,
        deletedAt
      }
    });

    const userUpdated = new User(userData);

    return userUpdated;
  }

  public async updateEmail(id: number, newEmail: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { email: newEmail }
    });
  }

  public async updatePassword(id: number, newPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password: newPassword }
    });
  }

  public async softDelete(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
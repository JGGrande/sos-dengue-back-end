import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";

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

}
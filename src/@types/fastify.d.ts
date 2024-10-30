import { FastifyRequest } from 'fastify';
import { Role } from 'src/modules/user/domain/entities/user-roles.enum';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: number;
      role: Role;
    };
  }
}
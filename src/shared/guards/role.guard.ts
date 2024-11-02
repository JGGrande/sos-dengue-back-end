import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FastifyRequest } from 'fastify';
import { Observable } from "rxjs";
import { Role } from "src/modules/user/domain/entities/user-roles.enum";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ){ }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if(!requiredRoles){
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as FastifyRequest;

    if(!user){
      return false;
    }

    if(!requiredRoles.includes(user.role)){
      return false;
    }

    return true
  }
}
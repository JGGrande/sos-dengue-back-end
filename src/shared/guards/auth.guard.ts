import { z } from "zod";
import { Observable } from "rxjs";
import { FastifyRequest } from 'fastify';
import { JwtService } from "@nestjs/jwt";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ){ }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as FastifyRequest

    const { authorization } = request.headers;

    if(!authorization){
      throw new ForbiddenException("Token não enviado.");
    }

    const [ , token] = authorization.split(" ");

    try {
      const data = this.jwtService.verify(token);

      const tokenSchema = z.object({
        id: z.coerce.number().int().positive()
      });

      const { id } = tokenSchema.parse(data);

      request.user = { id: id };

      return true
    }catch(e){
      console.error(e);
      return false;
    }
  }
}
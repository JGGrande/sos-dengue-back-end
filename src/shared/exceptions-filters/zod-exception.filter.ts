import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ZodError } from "zod";

@Catch(ZodError)
export class ZodExceptionFilter extends BaseExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;

    response.status(status).send({
      statusCode: status,
      message: "Id inválido",
      errors: exception.errors
    });
  }
}
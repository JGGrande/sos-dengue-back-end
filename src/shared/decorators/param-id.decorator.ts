import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { z } from "zod";

export const ParamId = createParamDecorator(( _data: unknown, context: ExecutionContext ) => {
  const paramName = typeof _data == "string" ? _data : 'id';

  const { params } = context.switchToHttp().getRequest();

  const ParmIdSchema = z.object({
    [paramName]: z.coerce.number({ message: `${paramName} não econtrado.` }).int().positive()
  });

  const paramId = ParmIdSchema.parse(params)[paramName];

  return paramId;
});
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { z } from "zod";

export const ParamId = createParamDecorator(( _data: unknown, context: ExecutionContext ) => {
  const paramIdName = typeof _data == "string" ? _data : 'id';

  const { params } = context.switchToHttp().getRequest();

  const ParmIdSchema = z.object({
    [paramIdName]: z.coerce.number({ message: `${paramIdName} não econtrado.` }).int().positive()
  });

  const { paramId } = ParmIdSchema.parse(params);

  return paramId;
});
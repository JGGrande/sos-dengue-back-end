import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { z } from "zod";

export const ParamId = createParamDecorator(( _data: unknown, context: ExecutionContext ) => {
  const { params } = context.switchToHttp().getRequest();

  const ParmIdSchema = z.object({
    id: z.coerce.number().int().positive().min(1)
  });

  const { id } = ParmIdSchema.parse(params);

  return id;
});
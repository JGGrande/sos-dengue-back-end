import { Prisma, PrismaClient } from "@prisma/client";
import { Env } from "../config/config.module";

const { NODE_ENV } = process.env as Env;

const logLevels: Prisma.LogLevel[] = NODE_ENV === 'production' || NODE_ENV === 'homologacao'
  ? ['error']
  : ['query', 'info', 'warn', 'error'];

export const extendedPrismaClient = new PrismaClient({ log: logLevels })
.$extends({
  query: {
    user: {
      async $allOperations({ model, operation, args, query }){
        if(
          operation === "findUnique" ||
          operation === "findFirst" ||
          operation === "findMany" ||
          operation === "findFirstOrThrow" ||
          operation === "findUniqueOrThrow"
        ){
          args.relationLoadStrategy = "join";
          args.where = { deletedAt: null, ...args.where };
        }
        return query(args);
      }
    }
  },
});

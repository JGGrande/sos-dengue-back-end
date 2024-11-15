import { PrismaClient } from "@prisma/client";

export const extendedPrismaClient = new PrismaClient()
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

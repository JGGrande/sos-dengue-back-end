import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { extendedPrismaClient } from './prisma.extension';
import { Env } from "../config/config.module";

const { NODE_ENV } = process.env as Env;

const logLevels: Prisma.LogLevel[] = NODE_ENV === 'production' || NODE_ENV === 'homologacao'
  ? ['error']
  : ['query', 'info', 'warn', 'error'];


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  constructor(){
    super({
      log: logLevels
    })
  }

  async onModuleInit() {
    Object.assign(this, extendedPrismaClient);
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
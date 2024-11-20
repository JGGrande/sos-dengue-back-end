import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { extendedPrismaClient } from './prisma.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    Object.assign(this, extendedPrismaClient);
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
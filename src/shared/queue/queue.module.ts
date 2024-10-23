import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailConsumer } from "src/modules/auth/infra/consumers/email.consumer";
import { QueueService } from "./queue.service";

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: true,
        },
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
      inject: [ ConfigService ],
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [
    QueueService,
    EmailConsumer
  ],
  exports:[
    QueueService,
    BullModule
  ]
})
export class QueueModule {}
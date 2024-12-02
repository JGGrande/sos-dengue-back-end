import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './shared/config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { QueueModule } from './shared/queue/queue.module';
import { ResidenceModule } from './modules/residence/residence.module';
import { VisitModule } from './modules/visit/visit.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerExceptionFilter } from './shared/exceptions-filters/throttler-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          port: configService.getOrThrow<number>('EMAIL_PROVIDER_PORT'),
          host: configService.getOrThrow<string>('EMAIL_PROVIDER_HOST'),
          auth: {
            user: configService.getOrThrow<string>('EMAIL_PROVIDER_USER'),
            pass: configService.getOrThrow<string>('EMAIL_PROVIDER_PASSWORD'),
          },
        },
        defaults: {
          from: `"Mensagem automática" <${configService.getOrThrow<string>("EMAIL_PROVIDER_USER")}>`,
        },
        template: {
          dir: join(__dirname, 'shared', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        }
      }),
      inject: [ ConfigService ],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1000
      }
    ]),
    QueueModule,
    UserModule,
    AuthModule,
    ResidenceModule,
    VisitModule,
    IntegrationModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
  }
  ],
})
export class AppModule {}

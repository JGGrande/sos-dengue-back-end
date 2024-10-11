import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './shared/config/config.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          port: configService.get<number>('EMAIL_PROVIDER_PORT'),
          host: configService.get<string>('EMAIL_PROVIDER_HOST'),
          auth: {
            user: configService.get<string>('EMAIL_PROVIDER_USER'),
            pass: configService.get<string>('EMAIL_PROVIDER_PASSWORD'),
          },
        },
        defaults: {
          from: '"Mensagem automática" <bot@sosdengue.app>',
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
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

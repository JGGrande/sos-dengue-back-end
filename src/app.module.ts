import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { UserModule } from './modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        port: 2525,
        host: "smtp.mailtrap.io",
        auth: {
          user: "70cd8fe5f14237",
          pass: "72ca528453aee3"
        }
      },
      defaults: {
        from: '"Mensagem automática" <bot@sosdengue.app>',
      },
      template: {
        dir: join(__dirname, "shared", "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },

    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

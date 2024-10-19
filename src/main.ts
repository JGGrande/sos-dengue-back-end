import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Env } from './shared/config/config.module';
import { ZodExceptionFilter } from './shared/exceptions-filters/zod-exception.filter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new ZodExceptionFilter());

  app.setGlobalPrefix('api');

  app.enableCors();

  const { PORT } = process.env as Env;

  app.setViewEngine({
    engine: {
      handlebars: require('hbs'),
    },
    templates: join(__dirname, "shared", "templates"),
  });

  await app.listen(
    PORT,
    '0.0.0.0',
    () => console.info(`Server on in port ${PORT}`)
  );
}
bootstrap();

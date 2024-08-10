import { NestFactory } from '@nestjs/core';
import { 
  FastifyAdapter, 
  NestFastifyApplication 
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Env } from './shared/config/config.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const { PORT } = process.env as Env;

  await app.listen(
    PORT, 
    '0.0.0.0', 
    () => console.info(`Server on on port ${PORT}`)
  );
}
bootstrap();

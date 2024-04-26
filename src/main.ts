import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './configs/envs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  await app.listen(PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-oauth2-jwt-bearer';
import { AppModule } from './app.module';
import {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER_URL,
  AUTH0_TOKEN_SIGN_ALG,
  PORT,
} from './configs/envs';
import { useContainer } from 'class-validator';

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

  const jwtCheck = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER_URL,
    tokenSigningAlg: AUTH0_TOKEN_SIGN_ALG,
  });

  app.use(jwtCheck);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT);
}
bootstrap();

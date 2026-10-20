import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; //dodan uvoz
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
  
  app.useGlobalPipes(new ValidationPipe()); // ValidationPipe postavljen pred  'await. app.listen...'

  await app.listen(Number(process.env.PORT ?? 3000));
}
bootstrap();
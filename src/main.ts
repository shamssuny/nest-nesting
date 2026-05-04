import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true, //only the DTO params are received, others params will cut
      transform : true //try to convert as it is like '21' will try be 21 
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

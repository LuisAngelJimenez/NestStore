import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //colocamos un prefijo a los endpoints//
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    //validationPipe valida los dto´s//
    new ValidationPipe({
      whitelist:true,
      transform:true
    })
  )
  await app.listen(3000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 7879;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lost 2D Platformer Game Server Documentation')
    .setDescription('Documentation for the game server')
    .setVersion('1.0.2')
    .addTag('Lost 2D Platformer Backend')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT);
}

bootstrap();

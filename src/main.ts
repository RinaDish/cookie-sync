import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cookie Sync API')
    .setDescription('Документация API для cookie-синхронизации')
    .setVersion('1.0')
    .addTag('sync')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { exposeDefaultValues: true },
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // writeFileSync('./swagger.json', JSON.stringify(document)); // 👈 добавь
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get<number>('PORT') || 3000);
}
bootstrap();

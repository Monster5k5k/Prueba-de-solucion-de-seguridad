import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Sirve la carpeta uploads/ como archivos estáticos → http://localhost:3001/uploads/imagen.jpg
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

  // Habilitar CORS para que el frontend Next.js pueda comunicarse con la API
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validación global de DTOs con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Elimina campos no declarados en el DTO
      forbidNonWhitelisted: false,
      transform: true,       // Transforma los tipos automáticamente (ej: string → number)
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Tienda Online API')
    .setDescription('API REST para la Tienda Online - Trabajo de 3º Trimestre')
    .setVersion('1.0')
    .addBearerAuth()  // Permite autenticarse en Swagger con Bearer token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger en http://localhost:3001/api

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
  console.log(`📚 Swagger en http://localhost:${port}/api`);
}

bootstrap();

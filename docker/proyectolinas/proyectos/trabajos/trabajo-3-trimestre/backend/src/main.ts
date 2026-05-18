import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Sirve la carpeta uploads/ como archivos estáticos → http://localhost:3001/uploads/imagen.jpg
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

  // Habilitar CORS para que el frontend Next.js pueda comunicarse con la API
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
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

  // Seed: crear usuario admin si no existe
  try {
    const dataSource = app.get(DataSource);
    const existing = await dataSource.query(
      'SELECT id FROM usuarios WHERE email = $1',
      ['admin@linas.com'],
    );
    if (existing.length === 0) {
      const hash = await bcrypt.hash('Admin123', 10);
      await dataSource.query(
        'INSERT INTO usuarios (nombre, email, password, perfil, "createdAt") VALUES ($1, $2, $3, $4, NOW())',
        ['Admin', 'admin@linas.com', hash, 'admin'],
      );
      console.log('Seed: admin@linas.com creado con contraseña Admin123');
    }
  } catch (e) {
    console.warn('Seed skipped:', e.message);
  }

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
  console.log(`📚 Swagger en http://localhost:${port}/api`);
}

bootstrap();

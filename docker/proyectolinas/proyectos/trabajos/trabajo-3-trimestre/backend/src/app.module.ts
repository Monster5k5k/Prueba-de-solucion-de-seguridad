import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ProductosModule } from './productos/productos.module';
import { CarritoModule } from './carrito/carrito.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './entities/usuario.entity';
import { Producto } from './entities/producto.entity';
import { Carrito } from './entities/carrito.entity';

@Module({
  imports: [
    // Carga las variables de entorno desde .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión a PostgreSQL con TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'tienda_online',
      entities: [Usuario, Producto, Carrito],
      // synchronize: true crea/actualiza las tablas automáticamente (solo en desarrollo)
      synchronize: true,
    }),

    AuthModule,
    UploadModule,
    ProductosModule,
    CarritoModule,
    UsuariosModule,
  ],
})
export class AppModule {}

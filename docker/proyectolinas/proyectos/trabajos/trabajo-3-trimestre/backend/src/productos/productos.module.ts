import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from '../entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  providers: [ProductosService],
  controllers: [ProductosController],
})
export class ProductosModule {}

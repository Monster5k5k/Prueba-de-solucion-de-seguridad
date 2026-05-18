import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from '../entities/carrito.entity';
import { Producto } from '../entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, Producto])],
  providers: [CarritoService],
  controllers: [CarritoController],
})
export class CarritoModule {}

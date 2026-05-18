import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Carrito } from '../entities/carrito.entity';
import { Producto } from '../entities/producto.entity';
import { AddCarritoDto, UpdateCarritoDto } from './carrito.dto';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private carritoRepo: Repository<Carrito>,
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  // Ver carrito activo del usuario (solo ítems sin fecha_pago)
  async getCarrito(usuarioId: number): Promise<Carrito[]> {
    return this.carritoRepo.find({
      where: {
        usuario: { id: usuarioId },
        fecha_pago: IsNull(),
      },
      relations: ['producto'],
      order: { createdAt: 'ASC' },
    });
  }

  // Añadir producto al carrito (si ya existe, aumenta la cantidad)
  async addProducto(usuarioId: number, dto: AddCarritoDto): Promise<Carrito> {
    // Verificar que el producto existe
    const producto = await this.productoRepo.findOne({
      where: { id: dto.productoId },
    });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${dto.productoId} no encontrado`);
    }

    // Verificar si ya está en el carrito (sin pagar)
    const existente = await this.carritoRepo.findOne({
      where: {
        usuario: { id: usuarioId },
        producto: { id: dto.productoId },
        fecha_pago: IsNull(),
      },
    });

    if (existente) {
      // Aumentar la cantidad del ítem existente
      existente.cantidad += dto.cantidad;
      return this.carritoRepo.save(existente);
    }

    // Crear nuevo ítem en el carrito
    const item = this.carritoRepo.create({
      usuario: { id: usuarioId } as any,
      producto: { id: dto.productoId } as any,
      cantidad: dto.cantidad,
    });

    return this.carritoRepo.save(item);
  }

  // Editar cantidad de un ítem del carrito
  async updateCantidad(
    itemId: number,
    usuarioId: number,
    dto: UpdateCarritoDto,
  ): Promise<Carrito> {
    const item = await this.carritoRepo.findOne({
      where: { id: itemId },
      relations: ['usuario'],
    });

    if (!item) throw new NotFoundException('Ítem del carrito no encontrado');

    // Verificar que el ítem pertenece al usuario
    if (item.usuario.id !== usuarioId) {
      throw new ForbiddenException('No puedes modificar este ítem');
    }

    // No se puede modificar un ítem ya pagado
    if (item.fecha_pago) {
      throw new BadRequestException('No se puede modificar un pedido ya pagado');
    }

    item.cantidad = dto.cantidad;
    return this.carritoRepo.save(item);
  }

  // Eliminar un ítem del carrito
  async removeItem(
    itemId: number,
    usuarioId: number,
  ): Promise<{ mensaje: string }> {
    const item = await this.carritoRepo.findOne({
      where: { id: itemId },
      relations: ['usuario'],
    });

    if (!item) throw new NotFoundException('Ítem del carrito no encontrado');

    if (item.usuario.id !== usuarioId) {
      throw new ForbiddenException('No puedes eliminar este ítem');
    }

    if (item.fecha_pago) {
      throw new BadRequestException('No se puede eliminar un ítem ya pagado');
    }

    await this.carritoRepo.remove(item);
    return { mensaje: 'Ítem eliminado del carrito' };
  }

  // Pagar: establece fecha_pago = ahora en todos los ítems activos del usuario
  async pagar(usuarioId: number): Promise<{ mensaje: string; total: number }> {
    const items = await this.getCarrito(usuarioId);

    if (items.length === 0) {
      throw new BadRequestException('El carrito está vacío');
    }

    const ahora = new Date();
    let total = 0;

    for (const item of items) {
      item.fecha_pago = ahora;
      total += Number(item.producto.precio) * item.cantidad;
      await this.carritoRepo.save(item);

      // Reducir el stock del producto según la cantidad comprada
      const producto = item.producto;
      producto.stock = Math.max(0, producto.stock - item.cantidad);
      await this.productoRepo.save(producto);
    }

    return {
      mensaje: `Pago realizado correctamente. ${items.length} productos pagados.`,
      total: Math.round(total * 100) / 100,
    };
  }
}

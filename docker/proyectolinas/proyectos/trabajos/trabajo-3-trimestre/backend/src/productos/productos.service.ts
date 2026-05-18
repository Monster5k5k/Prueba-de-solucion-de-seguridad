import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { CreateProductoDto, UpdateProductoDto } from './productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  // Lista todos los productos, con búsqueda opcional por nombre
  findAll(query?: string): Promise<Producto[]> {
    if (query) {
      return this.productoRepo.find({
        where: { nombre: Like(`%${query}%`) },
        order: { createdAt: 'DESC' },
      });
    }
    return this.productoRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepo.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async create(dto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepo.create(dto);
    return this.productoRepo.save(producto);
  }

  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, dto);
    return this.productoRepo.save(producto);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const producto = await this.findOne(id);
    await this.productoRepo.remove(producto);
    return { mensaje: `Producto "${producto.nombre}" eliminado correctamente` };
  }
}

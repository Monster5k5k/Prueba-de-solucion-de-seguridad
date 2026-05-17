import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTarkovDto } from './dto/create-tarkov.dto';
import { UpdateTarkovDto } from './dto/update-tarkov.dto';
import { ItemTarkov } from './entities/item-tarkov.entity';

@Injectable()
export class TarkovService {
  constructor(
    @InjectRepository(ItemTarkov)
    private readonly itemRepo: Repository<ItemTarkov>,
  ) {}

  create(dto: CreateTarkovDto): Promise<ItemTarkov> {
    const item = this.itemRepo.create(dto);
    return this.itemRepo.save(item);
  }

  findAll(): Promise<ItemTarkov[]> {
    return this.itemRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<ItemTarkov> {
    const item = await this.itemRepo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item Tarkov ${id} no encontrado`);
    return item;
  }

  async update(id: number, dto: UpdateTarkovDto): Promise<ItemTarkov> {
    const item = await this.findOne(id);
    this.itemRepo.merge(item, dto);
    return this.itemRepo.save(item);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.itemRepo.delete(id);
  }

  findByNombre(nombre: string): Promise<ItemTarkov[]> {
    return this.itemRepo.find({ where: { nombre: Like(`%${nombre}%`) } });
  }

  findByCategoria(categoria: string): Promise<ItemTarkov[]> {
    return this.itemRepo.find({ where: { categoria: Like(`%${categoria}%`) } });
  }

  findFIR(): Promise<ItemTarkov[]> {
    return this.itemRepo.find({ where: { encontradoEnIncursion: true } });
  }

  async seed(): Promise<{ mensaje: string }> {
    const total = await this.itemRepo.count();
    if (total > 0) return { mensaje: 'La base de datos ya tiene items de Tarkov' };

    const items = [
      { nombre: 'LEDX Skin Transilluminator', categoria: 'Médico', precio: 800000, peso: 1, encontradoEnIncursion: true, descripcion: 'Item médico de alto valor, muy buscado en el mercado.' },
      { nombre: 'GPU gráfica', categoria: 'Electrónica', precio: 600000, peso: 1, encontradoEnIncursion: true, descripcion: 'Tarjeta gráfica para quests y crafting.' },
      { nombre: 'M4A1', categoria: 'Arma', precio: 250000, peso: 4, encontradoEnIncursion: false, descripcion: 'Rifle de asalto versátil con muchos accesorios.' },
      { nombre: 'MP5', categoria: 'Arma', precio: 90000, peso: 2, encontradoEnIncursion: false, descripcion: 'Subfusil compacto y fiable.' },
      { nombre: 'Mochila Trizip', categoria: 'Mochila', precio: 130000, peso: 1, encontradoEnIncursion: false, descripcion: 'Gran capacidad de almacenamiento (35 slots).' },
      { nombre: 'Armadura Slick', categoria: 'Armadura', precio: 400000, peso: 9, encontradoEnIncursion: false, descripcion: 'La mejor protección de clase 6 disponible.' },
      { nombre: 'Casco Altyn', categoria: 'Casco', precio: 320000, peso: 4, encontradoEnIncursion: false, descripcion: 'Casco de clase 5 con visor integrado.' },
      { nombre: 'Baterías de ordenador', categoria: 'Electrónica', precio: 45000, peso: 1, encontradoEnIncursion: false, descripcion: 'Componente para crafting en el Hideout.' },
      { nombre: 'Morfina', categoria: 'Médico', precio: 25000, peso: 1, encontradoEnIncursion: false, descripcion: 'Analgésico potente para curar fracturas.' },
      { nombre: 'Mapa Customs', categoria: 'Mapa', precio: 5000, peso: 1, encontradoEnIncursion: false, descripcion: 'Mapa del mapa Customs para orientarse.' },
    ];

    await this.itemRepo.save(items);
    return { mensaje: '10 items de Tarkov añadidos correctamente' };
  }
}

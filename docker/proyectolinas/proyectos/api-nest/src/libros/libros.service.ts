import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

  create(dto: CreateLibroDto): Promise<Libro> {
    const libro = this.libroRepo.create(dto);
    return this.libroRepo.save(libro);
  }

  findAll(): Promise<Libro[]> {
    return this.libroRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException(`Libro ${id} no encontrado`);
    return libro;
  }

  async update(id: number, dto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);
    this.libroRepo.merge(libro, dto);
    return this.libroRepo.save(libro);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.libroRepo.delete(id);
  }

  findByTitulo(titulo: string): Promise<Libro[]> {
    return this.libroRepo.find({ where: { titulo: Like(`%${titulo}%`) } });
  }

  findByAutor(autor: string): Promise<Libro[]> {
    return this.libroRepo.find({ where: { autor: Like(`%${autor}%`) } });
  }

  async seed(): Promise<{ mensaje: string }> {
    const total = await this.libroRepo.count();
    if (total > 0) return { mensaje: 'La base de datos ya tiene libros' };

    const libros = [
      { titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', genero: 'Novela', editorial: 'Alfaguara', cantidad: 15, precio: 19.99 },
      { titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', genero: 'Realismo Mágico', editorial: 'Sudamericana', cantidad: 10, precio: 17.50 },
      { titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', genero: 'Fábula', editorial: 'Salamandra', cantidad: 25, precio: 12.99 },
      { titulo: '1984', autor: 'George Orwell', genero: 'Distopía', editorial: 'Debolsillo', cantidad: 20, precio: 14.50 },
      { titulo: 'Dune', autor: 'Frank Herbert', genero: 'Ciencia Ficción', editorial: 'Debolsillo', cantidad: 8, precio: 21.00 },
      { titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', genero: 'Fantasía', editorial: 'Minotauro', cantidad: 12, precio: 18.00 },
      { titulo: 'Harry Potter y la Piedra Filosofal', autor: 'J.K. Rowling', genero: 'Fantasía', editorial: 'Salamandra', cantidad: 30, precio: 16.99 },
      { titulo: 'El Nombre del Viento', autor: 'Patrick Rothfuss', genero: 'Fantasía', editorial: 'Debolsillo', cantidad: 7, precio: 20.00 },
      { titulo: 'Juego de Tronos', autor: 'George R.R. Martin', genero: 'Fantasía', editorial: 'Gigamesh', cantidad: 6, precio: 22.50 },
      { titulo: 'La Sombra del Viento', autor: 'Carlos Ruiz Zafón', genero: 'Thriller', editorial: 'Planeta', cantidad: 9, precio: 15.99 },
    ];

    await this.libroRepo.save(libros);
    return { mensaje: '10 libros añadidos correctamente' };
  }
}

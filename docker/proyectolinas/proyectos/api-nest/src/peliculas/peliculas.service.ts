import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { Pelicula } from './entities/pelicula.entity';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,
  ) {}

  create(dto: CreatePeliculaDto): Promise<Pelicula> {
    const pelicula = this.peliculaRepo.create(dto);
    return this.peliculaRepo.save(pelicula);
  }

  findAll(): Promise<Pelicula[]> {
    return this.peliculaRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.peliculaRepo.findOneBy({ id });
    if (!pelicula) throw new NotFoundException(`Película ${id} no encontrada`);
    return pelicula;
  }

  async update(id: number, dto: UpdatePeliculaDto): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    this.peliculaRepo.merge(pelicula, dto);
    return this.peliculaRepo.save(pelicula);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.peliculaRepo.delete(id);
  }

  findByTitulo(titulo: string): Promise<Pelicula[]> {
    return this.peliculaRepo.find({ where: { titulo: Like(`%${titulo}%`) } });
  }

  findByFechas(desde: string, hasta: string): Promise<Pelicula[]> {
    return this.peliculaRepo.find({
      where: { fechaEstreno: Between(new Date(desde), new Date(hasta)) },
    });
  }

  async seed(): Promise<{ mensaje: string }> {
    const total = await this.peliculaRepo.count();
    if (total > 0) return { mensaje: 'La base de datos ya tiene películas' };

    const peliculas = [
      { titulo: 'El Padrino', director: 'Francis Ford Coppola', genero: 'Drama', fechaEstreno: new Date('1972-03-24'), duracion: 175 },
      { titulo: 'Matrix', director: 'Lana Wachowski', genero: 'Ciencia Ficción', fechaEstreno: new Date('1999-03-31'), duracion: 136 },
      { titulo: 'Interstellar', director: 'Christopher Nolan', genero: 'Ciencia Ficción', fechaEstreno: new Date('2014-11-07'), duracion: 169 },
      { titulo: 'Inception', director: 'Christopher Nolan', genero: 'Acción', fechaEstreno: new Date('2010-07-16'), duracion: 148 },
      { titulo: 'El Señor de los Anillos', director: 'Peter Jackson', genero: 'Fantasía', fechaEstreno: new Date('2001-12-19'), duracion: 178 },
      { titulo: 'Pulp Fiction', director: 'Quentin Tarantino', genero: 'Crimen', fechaEstreno: new Date('1994-10-14'), duracion: 154 },
      { titulo: 'El Caballero Oscuro', director: 'Christopher Nolan', genero: 'Acción', fechaEstreno: new Date('2008-07-18'), duracion: 152 },
      { titulo: 'Forrest Gump', director: 'Robert Zemeckis', genero: 'Drama', fechaEstreno: new Date('1994-07-06'), duracion: 142 },
      { titulo: 'Oppenheimer', director: 'Christopher Nolan', genero: 'Biográfico', fechaEstreno: new Date('2023-07-21'), duracion: 180 },
      { titulo: 'Gladiator', director: 'Ridley Scott', genero: 'Acción', fechaEstreno: new Date('2000-05-05'), duracion: 155 },
    ];

    await this.peliculaRepo.save(peliculas);
    return { mensaje: '10 películas añadidas correctamente' };
  }
}

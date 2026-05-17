import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepo: Repository<Pokemon>,
  ) {}

  create(dto: CreatePokemonDto): Promise<Pokemon> {
    const pokemon = this.pokemonRepo.create(dto);
    return this.pokemonRepo.save(pokemon);
  }

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepo.findOneBy({ id });
    if (!pokemon) throw new NotFoundException(`Pokemon ${id} no encontrado`);
    return pokemon;
  }

  async update(id: number, dto: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.findOne(id);
    this.pokemonRepo.merge(pokemon, dto);
    return this.pokemonRepo.save(pokemon);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.pokemonRepo.delete(id);
  }

  findByNombre(nombre: string): Promise<Pokemon[]> {
    return this.pokemonRepo.find({ where: { nombre: Like(`%${nombre}%`) } });
  }

  findByTipo(tipo: string): Promise<Pokemon[]> {
    return this.pokemonRepo.find({ where: { tipo: Like(`%${tipo}%`) } });
  }

  findByHpMayorQue(hp: number): Promise<Pokemon[]> {
    return this.pokemonRepo.find({ where: { hp: MoreThan(hp) } });
  }

  async seed(): Promise<{ mensaje: string }> {
    const total = await this.pokemonRepo.count();
    if (total > 0) return { mensaje: 'La base de datos ya tiene pokemon' };

    const pokemones = [
      { nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55, defensa: 40 },
      { nombre: 'Charizard', tipo: 'Fuego/Volador', hp: 78, ataque: 84, defensa: 78 },
      { nombre: 'Blastoise', tipo: 'Agua', hp: 79, ataque: 83, defensa: 100 },
      { nombre: 'Venusaur', tipo: 'Planta/Veneno', hp: 80, ataque: 82, defensa: 83 },
      { nombre: 'Mewtwo', tipo: 'Psíquico', hp: 106, ataque: 110, defensa: 90 },
      { nombre: 'Gengar', tipo: 'Fantasma/Veneno', hp: 60, ataque: 65, defensa: 60 },
      { nombre: 'Eevee', tipo: 'Normal', hp: 55, ataque: 55, defensa: 50 },
      { nombre: 'Snorlax', tipo: 'Normal', hp: 160, ataque: 110, defensa: 65 },
      { nombre: 'Dragonite', tipo: 'Dragón/Volador', hp: 91, ataque: 134, defensa: 95 },
      { nombre: 'Machamp', tipo: 'Lucha', hp: 90, ataque: 130, defensa: 80 },
    ];

    await this.pokemonRepo.save(pokemones);
    return { mensaje: '10 pokemon añadidos correctamente' };
  }
}

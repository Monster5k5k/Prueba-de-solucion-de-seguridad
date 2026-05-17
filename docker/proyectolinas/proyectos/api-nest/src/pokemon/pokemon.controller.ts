import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() dto: CreatePokemonDto) {
    return this.pokemonService.create(dto);
  }

  @Post('seed')
  seed() {
    return this.pokemonService.seed();
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('nombre/:nombre')
  findByNombre(@Param('nombre') nombre: string) {
    return this.pokemonService.findByNombre(nombre);
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string) {
    return this.pokemonService.findByTipo(tipo);
  }

  @Get('hp/:hp')
  findByHp(@Param('hp') hp: string) {
    return this.pokemonService.findByHpMayorQue(+hp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}

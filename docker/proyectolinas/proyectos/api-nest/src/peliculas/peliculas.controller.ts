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
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { PeliculasService } from './peliculas.service';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Post()
  create(@Body() dto: CreatePeliculaDto) {
    return this.peliculasService.create(dto);
  }

  @Post('seed')
  seed() {
    return this.peliculasService.seed();
  }

  @Get()
  findAll() {
    return this.peliculasService.findAll();
  }

  @Get('titulo/:titulo')
  findByTitulo(@Param('titulo') titulo: string) {
    return this.peliculasService.findByTitulo(titulo);
  }

  @Get('fechas/:desde/:hasta')
  findByFechas(@Param('desde') desde: string, @Param('hasta') hasta: string) {
    return this.peliculasService.findByFechas(desde, hasta);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peliculasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePeliculaDto) {
    return this.peliculasService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.peliculasService.remove(+id);
  }
}

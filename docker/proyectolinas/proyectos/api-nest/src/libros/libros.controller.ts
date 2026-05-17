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
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { LibrosService } from './libros.service';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  create(@Body() dto: CreateLibroDto) {
    return this.librosService.create(dto);
  }

  @Post('seed')
  seed() {
    return this.librosService.seed();
  }

  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  @Get('titulo/:titulo')
  findByTitulo(@Param('titulo') titulo: string) {
    return this.librosService.findByTitulo(titulo);
  }

  @Get('autor/:autor')
  findByAutor(@Param('autor') autor: string) {
    return this.librosService.findByAutor(autor);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.librosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLibroDto) {
    return this.librosService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.librosService.remove(+id);
  }
}

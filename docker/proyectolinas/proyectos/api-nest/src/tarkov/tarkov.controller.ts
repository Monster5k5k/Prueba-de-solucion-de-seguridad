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
import { CreateTarkovDto } from './dto/create-tarkov.dto';
import { UpdateTarkovDto } from './dto/update-tarkov.dto';
import { TarkovService } from './tarkov.service';

@Controller('tarkov')
export class TarkovController {
  constructor(private readonly tarkovService: TarkovService) {}

  @Post()
  create(@Body() dto: CreateTarkovDto) {
    return this.tarkovService.create(dto);
  }

  @Post('seed')
  seed() {
    return this.tarkovService.seed();
  }

  @Get()
  findAll() {
    return this.tarkovService.findAll();
  }

  @Get('fir')
  findFIR() {
    return this.tarkovService.findFIR();
  }

  @Get('nombre/:nombre')
  findByNombre(@Param('nombre') nombre: string) {
    return this.tarkovService.findByNombre(nombre);
  }

  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.tarkovService.findByCategoria(categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarkovService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTarkovDto) {
    return this.tarkovService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tarkovService.remove(+id);
  }
}

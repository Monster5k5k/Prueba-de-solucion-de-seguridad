import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { UpdatePerfilDto } from './usuarios.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';

// Todas las rutas de usuarios son solo para admin
@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cambiar perfil de usuario (solo admin)' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  updatePerfil(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePerfilDto,
  ) {
    return this.usuariosService.updatePerfil(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario (solo admin)' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }
}

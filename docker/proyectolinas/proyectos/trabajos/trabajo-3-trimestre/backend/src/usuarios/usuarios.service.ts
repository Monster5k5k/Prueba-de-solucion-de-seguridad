import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UpdatePerfilDto } from './usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  // Listar todos los usuarios (sin devolver contraseñas)
  async findAll(): Promise<Omit<Usuario, 'password'>[]> {
    const usuarios = await this.usuarioRepo.find({
      select: ['id', 'nombre', 'email', 'perfil', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
    return usuarios;
  }

  // Cambiar el perfil de un usuario (ej: de 'usuario' a 'admin')
  async updatePerfil(
    id: number,
    dto: UpdatePerfilDto,
  ): Promise<Omit<Usuario, 'password'>> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    usuario.perfil = dto.perfil;
    const actualizado = await this.usuarioRepo.save(usuario);

    const { password, ...resultado } = actualizado;
    return resultado;
  }

  // Eliminar un usuario
  async remove(id: number): Promise<{ mensaje: string }> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    await this.usuarioRepo.remove(usuario);
    return { mensaje: `Usuario "${usuario.email}" eliminado correctamente` };
  }
}

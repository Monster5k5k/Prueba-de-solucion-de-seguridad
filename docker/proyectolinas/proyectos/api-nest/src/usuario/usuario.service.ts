import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  create(dto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepo.create(dto);
    return this.usuarioRepo.save(usuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    this.usuarioRepo.merge(usuario, dto);
    return this.usuarioRepo.save(usuario);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.usuarioRepo.delete(id);
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOneBy({ email });
    if (!usuario) throw new NotFoundException(`Email ${email} no encontrado`);
    return usuario;
  }

  async activar(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.activo = true;
    return this.usuarioRepo.save(usuario);
  }

  async desactivar(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.activo = false;
    return this.usuarioRepo.save(usuario);
  }
}

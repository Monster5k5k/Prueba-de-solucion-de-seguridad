import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario, PerfilUsuario } from '../entities/usuario.entity';
import { RegisterDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Verificar si el email ya existe
    const existe = await this.usuarioRepo.findOne({
      where: { email: dto.email },
    });
    if (existe) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    // Hashear la contraseña con bcrypt (10 rondas de salt)
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const usuario = this.usuarioRepo.create({
      nombre: dto.nombre,
      email: dto.email,
      password: passwordHash,
      perfil: PerfilUsuario.USUARIO, // Siempre 'usuario' en el registro
    });

    const guardado = await this.usuarioRepo.save(usuario);

    // No devolver la contraseña
    const { password, ...resultado } = guardado;
    return resultado;
  }

  async login(dto: LoginDto) {
    // Buscar el usuario por email
    const usuario = await this.usuarioRepo.findOne({
      where: { email: dto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Comparar contraseña con bcrypt
    const passwordValida = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Generar JWT con payload: { id, email, perfil }
    const payload = {
      id: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    };
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PerfilUsuario } from '../entities/usuario.entity';

export class UpdatePerfilDto {
  @ApiProperty({
    enum: PerfilUsuario,
    example: PerfilUsuario.ADMIN,
    description: 'Nuevo perfil del usuario',
  })
  @IsEnum(PerfilUsuario)
  perfil: PerfilUsuario;
}

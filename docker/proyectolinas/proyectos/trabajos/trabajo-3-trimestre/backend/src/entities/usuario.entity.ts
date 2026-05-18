import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Carrito } from './carrito.entity';

export enum PerfilUsuario {
  USUARIO = 'usuario',
  ADMIN = 'admin',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: PerfilUsuario,
    default: PerfilUsuario.USUARIO,
  })
  perfil: PerfilUsuario;

  @CreateDateColumn()
  createdAt: Date;

  // Un usuario puede tener muchos ítems en el carrito
  @OneToMany(() => Carrito, (carrito) => carrito.usuario)
  carritos: Carrito[];
}

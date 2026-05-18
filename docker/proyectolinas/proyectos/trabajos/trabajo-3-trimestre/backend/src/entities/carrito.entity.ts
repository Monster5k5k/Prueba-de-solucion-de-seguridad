import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Producto } from './producto.entity';

// Tabla intermedia N:N entre Usuario y Producto con atributos propios
@Entity('carrito')
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  // Si tiene valor → pedido pagado. Si es null → pendiente de pago
  @Column({ type: 'timestamp', nullable: true })
  fecha_pago: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.carritos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Producto, (producto) => producto.carritos, {
    onDelete: 'CASCADE',
    eager: true, // Carga el producto automáticamente al consultar el carrito
  })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}

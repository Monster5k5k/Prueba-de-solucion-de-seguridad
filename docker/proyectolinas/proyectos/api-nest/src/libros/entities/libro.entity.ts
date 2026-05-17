import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column()
  genero: string;

  @Column()
  editorial: string;

  @Column()
  cantidad: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  precio: number;
}

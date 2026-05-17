import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemTarkov {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  categoria: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column()
  peso: number;

  @Column({ default: false })
  encontradoEnIncursion: boolean;

  @Column({ nullable: true })
  descripcion: string;
}

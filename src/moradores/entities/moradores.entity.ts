import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Moradias } from './moradias.entity';


@Entity()
export class Moradores {
  @PrimaryGeneratedColumn()
  idmoradores: number;

  @Column({ length: 45 })
  nome: string;

  @Column({length: 45})
  telefone: string;

  @Column({length: 45})
  email: string;

 @Column('int')
  moradia: number;

  @Column({length:500})
  foto: string;

 
  @ManyToOne(() => Moradias, moradias => moradias.moradores) // Define a relação Many-to-One
  @JoinColumn({ name: 'moradia' }) // Especifica o nome da coluna de chave estrangeira
  moradias: Moradias;
}

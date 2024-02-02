import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Moradores } from './moradores.entity';


@Entity()
export class Moradias {
  @PrimaryGeneratedColumn()
  idmoradias: number;

  @Column('int')
  numero:number;

  @Column('int')
  andar:number;

  @Column('int')
  id_responsavel:number;
  // Se você deseja obter todos os moradores de uma moradia, pode usar uma relação OneToMany
  @OneToMany(() => Moradores, morador => morador.moradia)
  moradores: Moradores[];
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


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

  @Column({length: 500})
  foto: string;
}

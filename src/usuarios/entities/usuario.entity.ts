import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:45})
  userName:string;

  @Column({length:255})
  userPass:string;
}

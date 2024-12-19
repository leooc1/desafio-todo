import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class Users {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255, nullable: false  })
  email: string;

  @Column({ length: 255 })
  senha: string;
}

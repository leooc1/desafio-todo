import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "src/users/users.entity";

@Entity({ name: 'tasks' })
export class Task {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column('text', { nullable: true })
  descricao: string;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => Users, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: Users;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;
}

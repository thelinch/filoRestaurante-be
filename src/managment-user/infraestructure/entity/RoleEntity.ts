import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActionEntity } from './ActionEntity';
import { UserEntity } from './UserEntity';
@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToMany(() => ActionEntity)
  @JoinTable()
  actions: ActionEntity[];
  @ManyToOne(() => UserEntity, (u) => u.roles)
  user: UserEntity;
}

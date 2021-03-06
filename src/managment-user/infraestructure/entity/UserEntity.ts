import { OrderEntity } from '../../../order-handling/infraestructure/entity/OrderEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './RoleEntity';
export enum userState {
  ACTIVO = 'activo',
  DESACTIVADO = 'desactivado',
}
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  userName: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: userState, default: userState.ACTIVO })
  state: string;
  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderEntity, (o) => o.user)
  orders: OrderEntity[];
}

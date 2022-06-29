import { UserEntity } from '../../../managment-user/infraestructure/entity/UserEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './OrderEntity';

@Entity({ name: 'typeOrder' })
export class TypeOrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'varchar' })
  color: string;
  @Column({ nullable: false, type: 'varchar' })
  name: string;
  @Column({ nullable: false, type: 'double' })
  price: number;
  @Column({ nullable: false, type: 'boolean', default: true })
  localAttention: boolean;
  @OneToMany(() => OrderEntity, (orderDetail) => orderDetail.type, {
    orphanedRowAction: 'delete',
    persistence: true,
    cascade: true,
  })
  orders?: OrderEntity[];
}

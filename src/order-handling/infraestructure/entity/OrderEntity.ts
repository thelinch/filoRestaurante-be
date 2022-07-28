import { UserEntity } from '../../../managment-user/infraestructure/entity/UserEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetailEntity } from './OrderDetailEntity';
import { TableEntity } from './TableEntity';
import { TypeOrderEntity } from './TypeOrderEntity';
import { StatusEntity } from './StatusEntity';
export enum OrderState {
  CREADO = 'creado',
  RECHAZADO = 'rechazado',
  ELIMINADO = 'eliminado',
  ATENDIDO = 'atendido',
  ENREALIZACION = 'en realizacion',
  PAGADO = 'pagado',
}

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  resume: string;
  @Column({ nullable: true })
  observation: string;
  @Column({ type: 'float' })
  total: number;
  @Column({ type: 'varchar', nullable: false, length: 50 })
  code: string;

  @Column({ type: 'varchar' })
  state: string;
  @Column({ type: 'date' })
  fechaCreacion: Date;
  @ManyToOne(() => TableEntity, (t) => t.orders, {
    nullable: true,
    onUpdate: 'CASCADE',
  })
  table: TableEntity;
  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order, {
    orphanedRowAction: 'delete',
    persistence: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  orderDetails: OrderDetailEntity[];
  @Column()
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;
  @ManyToOne(() => TypeOrderEntity, { nullable: false, onUpdate: 'CASCADE' })
  type: TypeOrderEntity;
  @Column({ name: 'statusId' })
  @ManyToOne(() => StatusEntity, { primary: true })
  status: StatusEntity;
}

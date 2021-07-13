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
  @Column({ type: 'decimal', precision: 8, scale: 2 })
  total: number;
  @Column({ type: 'enum', enum: OrderState, default: OrderState.CREADO })
  state: string;
  @Column({ type: 'date' })
  fechaCreacion: Date;
  @ManyToOne(() => TableEntity, (t) => t.orders, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  table: TableEntity;
  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order, {
    orphanedRowAction: 'delete',
    persistence: true,
    cascade: true,
  })
  orderDetails: OrderDetailEntity[];
  @CreateDateColumn()
  @Column()
  created_at: Date;
}

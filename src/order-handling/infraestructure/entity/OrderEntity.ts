import {
  Column,
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
}
@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  resume: string;
  @Column()
  observation: string;
  @Column()
  total: number;
  @Column({ type: 'enum', enum: OrderState, default: OrderState.CREADO })
  state: string;

  @Column({ type: 'date' })
  fechaCreacion: Date;
  @ManyToOne(() => TableEntity)
  table: TableEntity;
  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order, {
    orphanedRowAction: 'delete',
    persistence: true,
    cascade: true,
  })
  orderDetails: OrderDetailEntity[];
}

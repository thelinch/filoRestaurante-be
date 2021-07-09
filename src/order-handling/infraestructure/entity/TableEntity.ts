import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './OrderEntity';
export enum TableState {
  OCUPADO = 'ocupado',
  DISPONIBLE = 'disponible',
  ELIMINADO = 'eliminado',
  ACTIVO = 'activo',
}

@Entity({ name: 'table' })
export class TableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'enum', enum: TableState, default: TableState.ACTIVO })
  state: string;
  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.table)
  orders: OrderEntity[];
}

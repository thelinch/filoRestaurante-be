import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './OrderEntity';
import { ProductEntity } from './ProductEntity';
import { StatusEntity } from './StatusEntity';
export enum OrderDetailState {
  CREADO = 'creado',
  RECHAZADO = 'rechazado',
  ELIMINADO = 'eliminado',
  ATENDIDO = 'atendido',
  ENREALIZACION = 'en realizacion',
  PAGADO = 'pagado',
}
@Entity({ name: 'orderDetail' })
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  orderedQuantity: number;
  @Column({ nullable: true })
  observation: string;
  @ManyToOne(() => ProductEntity, (p) => p.orderDetails)
  product: ProductEntity;
  @ManyToOne(() => OrderEntity, (o) => o.orderDetails)
  order: OrderEntity;
  @ManyToOne((type) => StatusEntity, { eager: true })
  status: StatusEntity;
}

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './OrderEntity';
import { ProductEntity } from './ProductEntity';

@Entity({name: 'orderDetail'})
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => ProductEntity, (p) => p.orderDetails)
  product: ProductEntity;
  @ManyToOne(() => OrderEntity, (o) => o.orderDetails)
  order: OrderEntity;
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { OrderDetailEntity } from './OrderDetailEntity';
export enum ProductState {
  ACTIVO = 'activo',
  DESACTIVADO = 'desactivado',
}
@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  quantity: number;
  @Column({ type: 'enum', enum: ProductState, default: ProductState.ACTIVO })
  state: ProductState;
  @Column()
  price: number;
  @OneToMany(() => OrderDetailEntity, (o) => o.product)
  orderDetails: OrderDetailEntity[];
  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
}

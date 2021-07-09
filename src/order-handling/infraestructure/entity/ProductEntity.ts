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

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  quantity: number;
  @Column()
  state: string;
  @Column()
  price: number;
  @OneToMany(() => OrderDetailEntity, (o) => o.product)
  orderDetails: OrderDetailEntity[];
  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
}

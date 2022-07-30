import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @Column({ type: 'int' })
  quantity: number;
  @Column({ type: 'enum', enum: ProductState, default: ProductState.ACTIVO })
  state: ProductState;
  @Column({ type: 'float' })
  price: number;
  @OneToMany(() => OrderDetailEntity, (o) => o.product)
  orderDetails: OrderDetailEntity[];
  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
  @Column({ type: 'date' })
  createdDate: Date;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}

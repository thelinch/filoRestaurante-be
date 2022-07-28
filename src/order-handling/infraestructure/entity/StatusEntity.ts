import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetailEntity } from './OrderDetailEntity';
import { OrderEntity } from './OrderEntity';

@Entity({ name: 'status' })
export class StatusEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'varchar', length: 14 })
  color: string;
  @Column({ nullable: false, type: 'varchar', length: 140 })
  name: string;
  @Column({ nullable: false, type: 'int' })
  order: number;
}

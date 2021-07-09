import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum CategoryState {
  ACTIVO = 'activo',
  DESACTIVADO = 'desactivado',
}
@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  isVisible: boolean;
  @Column({ type: 'enum', enum: CategoryState, default: CategoryState.ACTIVO })
  state: string;
}

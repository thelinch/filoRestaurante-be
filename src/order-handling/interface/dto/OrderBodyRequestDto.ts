import {
  IsNotEmpty,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { OrderDetailBodyRequestDto } from './OrderDetailBodyRequestDto';
import { TableBodyRequestDto } from './TableBodyRequestDto';

export class OrderBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  id: string;
  observation?: string;
  @IsNotEmpty({ message: 'Debe contener la mesa' })
  @ValidateNested()
  table: TableBodyRequestDto;

  @IsNotEmpty({ message: 'Debe contener al menos un producto' })
  @ValidateNested()
  orderDetails: OrderDetailBodyRequestDto[];
  user: any;
}

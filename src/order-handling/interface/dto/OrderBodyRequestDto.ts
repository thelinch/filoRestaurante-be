import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { OrderDetailBodyRequestDto } from './OrderDetailBodyRequestDto';
import { TableBodyRequestDto } from './tableBodyRequestDto';

export class OrderBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  readonly id: string;
  readonly observation?: string;
  @IsNotEmpty({ message: 'el resumen es requerido' })
  readonly resume: string;
  @IsNotEmpty({ message: 'el resumen es requerido' })
  readonly total: number;
  @IsNotEmpty({ message: 'Debe contener la mesa' })
  @ValidateNested()
  readonly table: TableBodyRequestDto;
  @IsNotEmpty({ message: 'Debe contener al menos un producto' })
  @ValidateNested()
  readonly orderDetails: OrderDetailBodyRequestDto[];
}

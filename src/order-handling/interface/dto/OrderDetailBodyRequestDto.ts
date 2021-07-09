import { IsNotEmpty, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { ProductBodyRequestDto } from './ProductBodyRequestDto';
import { TableBodyRequestDto } from './tableBodyRequestDto';

export class OrderDetailBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  readonly id: string;
  @IsNotEmpty({ message: 'debe contener un producto' })
  @ValidateNested()
  readonly product: ProductBodyRequestDto;
  @IsNotEmpty({ message: 'Debe contener la cantidad ordenada' })
  @IsPositive({ message: 'Debe ser un numero positivo' })
  readonly orderedQuantity: number;
}

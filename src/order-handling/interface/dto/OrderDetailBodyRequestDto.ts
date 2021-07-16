import { IsNotEmpty, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { ProductBodyRequestDto } from './ProductBodyRequestDto';

export class OrderDetailBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
   id: string;
  @IsNotEmpty({ message: 'debe contener un producto' })
  @ValidateNested()
   product: ProductBodyRequestDto;
  @IsNotEmpty({ message: 'Debe contener la cantidad ordenada' })
  @IsPositive({ message: 'Debe ser un numero positivo' })
   orderedQuantity: number;
}

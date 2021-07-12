import { IsNotEmpty, isNumber, IsPositive, IsUUID, Min } from 'class-validator';

export class ProductBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  readonly id: string;
  @IsNotEmpty({ message: 'Debe contener un nombre' })
  readonly name: string;
  @IsNotEmpty({ message: 'Debe contener una cantidad' })
  @IsPositive({ message: 'La cantidad debe ser positivo' })
  @Min(1, { message: 'La cantidad debe ser mayoy a uno' })
  readonly quantity: number;
  @IsPositive({ message: 'El precio debe ser positivo' })
  readonly price: number;
  @IsNotEmpty({ message: 'Debe contener las categorias' })
  readonly categories: any[];
}

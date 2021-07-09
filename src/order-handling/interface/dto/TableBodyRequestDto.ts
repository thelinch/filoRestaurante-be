import { IsNotEmpty, IsUUID } from 'class-validator';
import { OrderBodyRequestDto } from './OrderBodyRequestDto';

export class TableBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  readonly id: string;
  @IsNotEmpty({ message: 'Debe contener un nombre' })
  readonly name: string;
}
